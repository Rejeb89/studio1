'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';
import { downloadAsDoc } from '@/lib/download-helper';

interface TextDisplayProps {
  extractedText?: string;
  formattedText?: string;
  isLoading: boolean;
}

export function TextDisplay({ extractedText, formattedText, isLoading }: TextDisplayProps) {
  if (!isLoading && !extractedText && !formattedText) {
    return null;
  }

  const handleDownload = () => {
    if (formattedText) {
      downloadAsDoc(formattedText, 'ImageScribe-document.doc');
    }
  };
  
  const showSkeletons = isLoading && !extractedText && !formattedText;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Extracted Text</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full rounded-md border p-4 font-mono text-sm">
              {showSkeletons || (isLoading && !extractedText) ? (
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
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">AI Formatted Text</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full rounded-md border p-4 text-sm">
              {showSkeletons || (isLoading && !formattedText) ? (
                 <div className="space-y-2">
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[75%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{formattedText}</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {formattedText && !isLoading && (
        <div className="mt-8 flex justify-center">
            <Button
                onClick={handleDownload}
                className="bg-accent text-accent-foreground hover:bg-accent/90 py-6 px-8 text-base"
            >
                <Download className="mr-2 h-5 w-5" />
                Download .doc File
            </Button>
        </div>
      )}
    </div>
  );
}
