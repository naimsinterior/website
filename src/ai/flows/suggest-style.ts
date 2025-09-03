
// This file holds the Genkit flow for suggesting interior design styles based on an uploaded image.

'use server';

/**
 * @fileOverview An AI agent that suggests interior design styles based on an image.
 *
 * - suggestStyle - A function that suggests interior design styles based on an uploaded image.
 * - SuggestStyleInput - The input type for the suggestStyle function.
 * - SuggestStyleOutput - The return type for the suggestStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { inspirations } from '@/app/design/inspirations';

const SuggestStyleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestStyleInput = z.infer<typeof SuggestStyleInputSchema>;

const SuggestStyleOutputSchema = z.object({
  roomType: z.string().describe('The type of room identified in the photo, e.g., "Living Room", "Kitchen", "Bedroom".'),
  writtenSuggestions: z.string().describe('A paragraph of written suggestions for the room, based on the uploaded photo.'),
  suggestedStyles: z.array(
    z.object({
      styleName: z.string().describe('The name of the suggested interior design style.'),
      projectLinks: z.array(z.string()).describe('Links to relevant projects from the provided gallery list, in the format /design/<slug>.'),
    })
  ).describe('A list of suggested interior design styles with links to relevant projects.'),
});
export type SuggestStyleOutput = z.infer<typeof SuggestStyleOutputSchema>;

export async function suggestStyle(input: SuggestStyleInput): Promise<SuggestStyleOutput> {
  return suggestStyleFlow(input);
}

const inspirationList = inspirations.map(i => `- ${i.title} (slug: ${i.slug})`).join('\n');

const prompt = ai.definePrompt({
  name: 'suggestStylePrompt',
  input: {schema: SuggestStyleInputSchema},
  output: {schema: SuggestStyleOutputSchema},
  prompt: `You are an expert interior design consultant. A user will upload a photo of their room.

Your task is to:
1.  Identify the type of room in the image (e.g., Kitchen, Bedroom, Living Room).
2.  Provide a paragraph of written suggestions for improving the space, based on what you see in the photo. Be creative and helpful.
3.  Suggest up to two interior design styles that would be a good fit for the space.
4.  For each suggested style, you MUST recommend relevant projects from the gallery list provided below. Do NOT invent your own slugs. The links must be in the format /design/<slug>.

Available Inspirations Gallery:
${inspirationList}

Photo: {{media url=photoDataUri}}

Example Output for a modern-looking room:
{
  "roomType": "Living Room",
  "writtenSuggestions": "This is a great start for a modern living room. The neutral color palette provides a solid foundation. To enhance the space, consider adding a large, abstract piece of art on the main wall to create a focal point. A plush, textured area rug would add warmth and define the seating area. Finally, introducing some metallic accents, like a brass floor lamp or chrome decorative objects, would bring in a touch of modern glamour.",
  "suggestedStyles": [
    {
      "styleName": "Modern Chic",
      "projectLinks": ["/design/monochrome-magic-living-room"]
    }
  ]
}`,
});

const suggestStyleFlow = ai.defineFlow(
  {
    name: 'suggestStyleFlow',
    inputSchema: SuggestStyleInputSchema,
    outputSchema: SuggestStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
