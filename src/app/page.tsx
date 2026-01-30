'use client';

import { useState } from 'react';
import { processImage } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploadForm } from '@/components/image-scribe/image-upload-form';
import { TextDisplay } from '@/components/image-scribe/text-display';
import { Terminal } from 'lucide-react';

export default function Home() {
  const [extractedText, setExtractedText] = useState<string | undefined>();
  const [formattedText, setFormattedText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessImage = async (data: { file?: File; url?: string }) => {
    if (!data.file && !data.url) {
        setError("Please provide an image file or URL to proceed.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setExtractedText(undefined);
    setFormattedText(undefined);

    const formData = new FormData();
    if (data.file) {
      formData.append('image', data.file);
    } else if (data.url) {
      formData.append('url', data.url);
    }

    try {
      const result = await processImage(formData);
      setExtractedText(result.extractedText);
      setFormattedText(result.formattedText);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl space-y-8 py-8">
        <ImageUploadForm onSubmit={handleProcessImage} isLoading={isLoading} />
        
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
