'use client';

import { useEffect, useState } from 'react';
import { processImage } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploadForm } from '@/components/image-scribe/image-upload-form';
import { TextDisplay } from '@/components/image-scribe/text-display';
import { Terminal } from 'lucide-react';

export default function Home() {
  const [extractedText, setExtractedText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (extractedText && !isLoading) {
      if (extractedText === 'No text found in the image.') return;

      const header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Extracted Text</title></head><body>";
      const footer = '</body></html>';
      const content = `<pre>${extractedText}</pre>`;
      const sourceHTML = header + content + footer;

      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement('a');
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = 'extracted-text.doc';
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }
  }, [extractedText, isLoading]);

  const handleProcessImage = async (data: { file?: File }) => {
    if (!data.file) {
        setError("Please provide an image file to proceed.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setExtractedText(undefined);

    const formData = new FormData();
    if (data.file) {
      formData.append('image', data.file);
    }

    try {
      const result = await processImage(formData);
      setExtractedText(result.extractedText);
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
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
