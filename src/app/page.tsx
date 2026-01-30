'use client';

import { useState } from 'react';
import { getFormattedText } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploadForm } from '@/components/image-scribe/image-upload-form';
import { TextDisplay } from '@/components/image-scribe/text-display';
import { Terminal } from 'lucide-react';

export default function Home() {
  const [extractedText, setExtractedText] = useState<string | undefined>();
  const [formattedText, setFormattedText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractText = async (imageUrl: string) => {
    if (!imageUrl) {
        setError("Please provide an image file or URL to proceed.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setExtractedText(undefined);
    setFormattedText(undefined);

    // Simulate a delay for OCR processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This is where a real OCR would happen. We'll use placeholder text for demonstration.
    const simulatedExtractedText = `This is an exampel of text extraacted from an image. It has severel speling misteaks and lacks proper fomatting. We will see if the AI can cleen it up. also, all of this is in one single block with no paragraphs. another sentance with bad grammer. the quick brown fox jumps over the lazy dog.`;
    setExtractedText(simulatedExtractedText);

    try {
      const result = await getFormattedText(simulatedExtractedText);
      setFormattedText(result.formattedText);
    } catch (e) {
      setError('An error occurred while formatting the text. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl space-y-8 py-8">
        <ImageUploadForm onSubmit={handleExtractText} isLoading={isLoading} />
        
        {error && (
            <Alert variant="destructive" className="max-w-lg mx-auto">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <TextDisplay 
          extractedText={extractedText}
          formattedText={formattedText}
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
