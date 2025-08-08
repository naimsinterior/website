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

const SuggestStyleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestStyleInput = z.infer<typeof SuggestStyleInputSchema>;

const SuggestStyleOutputSchema = z.object({
  suggestedStyles: z.array(
    z.object({
      styleName: z.string().describe('The name of the suggested interior design style.'),
      projectLinks: z.array(z.string()).describe('Links to relevant projects in the gallery.'),
    })
  ).describe('A list of suggested interior design styles with links to relevant projects.'),
});
export type SuggestStyleOutput = z.infer<typeof SuggestStyleOutputSchema>;

export async function suggestStyle(input: SuggestStyleInput): Promise<SuggestStyleOutput> {
  return suggestStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStylePrompt',
  input: {schema: SuggestStyleInputSchema},
  output: {schema: SuggestStyleOutputSchema},
  prompt: `You are an expert interior design consultant. A user will upload a photo of their room, and you will suggest interior design styles that match the space.

You must return a JSON array of suggested styles, with links to similar projects in our gallery.

Photo: {{media url=photoDataUri}}

Example Output:
{
  "suggestedStyles": [
    {
      "styleName": "Modern Minimalist",
      "projectLinks": ["/projects/modern-1", "/projects/modern-2"]
    },
    {
      "styleName": "Scandinavian",
      "projectLinks": ["/projects/scandinavian-1", "/projects/scandinavian-2"]
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
