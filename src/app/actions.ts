'use server';

import { extractTextFromImage } from '@/ai/flows/extract-text-from-image';

export async function processImage(formData: FormData): Promise<{
  extractedText: string;
}> {
  const file = formData.get('image') as File | null;
  const url = formData.get('url') as string | null;
  let imageDataUri: string;

  if (!file && !url) {
    throw new Error('No image file or URL provided.');
  }

  try {
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
    } else if (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const buffer = Buffer.from(await response.arrayBuffer());
      imageDataUri = `data:${contentType};base64,${buffer.toString('base64')}`;
    } else {
      throw new Error('No image file or URL provided.');
    }
  } catch (error) {
      console.error('Error processing image source:', error);
      if (error instanceof Error && url) {
           throw new Error(`Could not fetch the image from the URL. Please check if the URL is correct and publicly accessible.`);
      }
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
