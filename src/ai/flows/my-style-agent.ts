
// This file holds the Genkit flow for suggesting interior design styles based on an uploaded image.

'use server';

/**
 * @fileOverview An AI agent that suggests interior design styles based on an image.
 *
 * - myStyleAgent - A function that suggests interior design styles based on an uploaded image.
 * - MyStyleAgentInput - The input type for the myStyleAgent function.
 * - MyStyleAgentOutput - The return type for the myStyleAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { inspirations } from '@/app/design/inspirations';

const MyStyleAgentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    roomType: z.string().describe('The type of room specified by the user, e.g., "Living Room", "Kitchen", "Bedroom".'),
});
export type MyStyleAgentInput = z.infer<typeof MyStyleAgentInputSchema>;

const MyStyleAgentOutputSchema = z.object({
  writtenSuggestions: z.string().describe('A paragraph of written suggestions for the room, based on the uploaded photo and specified room type.'),
  suggestedStyles: z.array(
    z.object({
      styleName: z.string().describe('The name of the suggested interior design style.'),
      projectLinks: z.array(z.string()).describe('Links to relevant projects from the provided gallery list, in the format /design/<slug>.'),
    })
  ).describe('A list of suggested interior design styles with links to relevant projects.'),
});
export type MyStyleAgentOutput = z.infer<typeof MyStyleAgentOutputSchema>;

export async function myStyleAgent(input: MyStyleAgentInput): Promise<MyStyleAgentOutput> {
  // Directly return a hardcoded response instead of calling the flow.
  // This removes the dependency on an external AI model.
  return Promise.resolve({
    writtenSuggestions: "This is a great start! To enhance your space, consider adding a large, abstract piece of art on the main wall to create a focal point. A plush, textured area rug would add warmth and define the seating area. Introducing some metallic accents, like a brass floor lamp or chrome decorative objects, would bring in a touch of modern glamour.",
    suggestedStyles: [
      {
        styleName: "Modern Chic",
        projectLinks: ["/design/monochrome-magic-living-room"]
      },
      {
        styleName: "Industrial Loft",
        projectLinks: ["/design/industrial-loft-kitchen"]
      }
    ]
  });
}

// The following flow is no longer used but is kept for reference.

const inspirationList = inspirations.map(i => `- ${i.title} (slug: ${i.slug})`).join('\n');

const prompt = ai.definePrompt({
  name: 'myStyleAgentPrompt',
  input: {schema: MyStyleAgentInputSchema},
  output: {schema: MyStyleAgentOutputSchema},
  prompt: `You are an expert interior design consultant. A user has uploaded a photo of their {{roomType}}.

Your task is to:
1.  Provide a paragraph of written suggestions for improving the space, based on what you see in the photo. Be creative, helpful, and human-like in your response.
2.  Suggest up to two interior design styles that would be a good fit for the space.
3.  For each suggested style, you MUST recommend relevant projects from the gallery list provided below. Do NOT invent your own slugs. The links must be in the format /design/<slug>.

Available Inspirations Gallery:
${inspirationList}

Photo: {{media url=photoDataUri}}

Example Output for a modern-looking Living Room:
{
  "writtenSuggestions": "This is a great start for a modern living room. The neutral color palette provides a solid foundation. To enhance the space, consider adding a large, abstract piece of art on the main wall to create a focal point. A plush, textured area rug would add warmth and define the seating area. Finally, introducing some metallic accents, like a brass floor lamp or chrome decorative objects, would bring in a touch of modern glamour.",
  "suggestedStyles": [
    {
      "styleName": "Modern Chic",
      "projectLinks": ["/design/monochrome-magic-living-room"]
    }
  ]
}`,
});

const myStyleAgentFlow = ai.defineFlow(
  {
    name: 'myStyleAgentFlow',
    inputSchema: MyStyleAgentInputSchema,
    outputSchema: MyStyleAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
