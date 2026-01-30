'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

interface TextDisplayProps {
  extractedText?: string;
  isLoading: boolean;
}

export function TextDisplay({ extractedText, isLoading }: TextDisplayProps) {
  if (!isLoading && !extractedText) {
    return null;
  }

  const handleDownload = () => {
    if (!extractedText || extractedText === 'No text found in the image.') return;

    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Extracted Text</title></head><body>";
    const footer = '</body></html>';
    // Using a pre tag to preserve whitespace and newlines, similar to the display
    const content = `<pre>${extractedText}</pre>`;
    const sourceHTML = header + content + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'extracted-text.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const showSkeletons = isLoading && !extractedText;
  const canDownload = !isLoading && extractedText && extractedText !== 'No text found in the image.';

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Extracted Text</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border p-4 font-mono text-sm">
            {showSkeletons ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{extractedText}</pre>
            )}
          </ScrollArea>
        </CardContent>
        {canDownload && (
          <CardFooter>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download as Word
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
