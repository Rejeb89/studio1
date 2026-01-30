'use server';

import { extractTextFromImage } from '@/ai/flows/extract-text-from-image';

export async function processImage(formData: FormData): Promise<{
  extractedText: string;
}> {
  const file = formData.get('image') as File | null;
  let imageDataUri: string;

  if (!file) {
    throw new Error('No image file provided.');
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    imageDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
  } catch (error) {
      console.error('Error processing image source:', error);
      throw new Error('Failed to read the image file.');
  }

  let extractedTextResult;
  try {
    extractedTextResult = await extractTextFromImage({ imageDataUri });
  } catch (error) {
    console.error('Error extracting text with AI:', error);
    throw new Error('An AI error occurred while extracting text from the image.');
  }
  
  const extractedText = extractedTextResult.extractedText;

  if (!extractedText.trim()) {
    return { extractedText: 'No text found in the image.' };
  }
  
  return { extractedText };
}
