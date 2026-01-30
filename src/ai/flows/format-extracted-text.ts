'use server';

/**
 * @fileOverview A flow to format extracted text using generative AI.
 *
 * - formatExtractedText - A function that formats extracted text.
 * - FormatExtractedTextInput - The input type for the formatExtractedText function.
 * - FormatExtractedTextOutput - The return type for the formatExtractedText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatExtractedTextInputSchema = z.object({
  extractedText: z
    .string()
    .describe('The text extracted from the image that needs formatting.'),
});
export type FormatExtractedTextInput = z.infer<typeof FormatExtractedTextInputSchema>;

const FormatExtractedTextOutputSchema = z.object({
  formattedText: z.string().describe('The formatted and improved text.'),
});
export type FormatExtractedTextOutput = z.infer<typeof FormatExtractedTextOutputSchema>;

export async function formatExtractedText(input: FormatExtractedTextInput): Promise<FormatExtractedTextOutput> {
  return formatExtractedTextFlow(input);
}

const formatExtractedTextPrompt = ai.definePrompt({
  name: 'formatExtractedTextPrompt',
  input: {schema: FormatExtractedTextInputSchema},
  output: {schema: FormatExtractedTextOutputSchema},
  prompt: `You are an AI assistant that formats and improves extracted text.

  Your goal is to clean up the text, correct spelling and grammar errors, and create paragraphs for better readability.
  If the extracted text is code-like, then just return the text as is without correcting spelling or grammar.

  Extracted Text: {{{extractedText}}}`,
});

const formatExtractedTextFlow = ai.defineFlow(
  {
    name: 'formatExtractedTextFlow',
    inputSchema: FormatExtractedTextInputSchema,
    outputSchema: FormatExtractedTextOutputSchema,
  },
  async input => {
    const {output} = await formatExtractedTextPrompt(input);
    return output!;
  }
);
