'use server';

import { formatExtractedText } from '@/ai/flows/format-extracted-text';

export async function getFormattedText(
  extractedText: string
): Promise<{ formattedText: string }> {
  if (!extractedText) {
    throw new Error('Extracted text cannot be empty.');
  }

  try {
    const result = await formatExtractedText({ extractedText });
    return result;
  } catch (error) {
    console.error('Error formatting text with AI:', error);
    // As a fallback, perform simple paragraph splitting.
    return { formattedText: extractedText.replace(/([.?!])\s*(?=[A-Z])/g, "$1\n\n") };
  }
}
