'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface TextDisplayProps {
  extractedText?: string;
  isLoading: boolean;
}

export function TextDisplay({ extractedText, isLoading }: TextDisplayProps) {
  if (!isLoading && !extractedText) {
    return null;
  }

  const showSkeletons = isLoading && !extractedText;

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
      </Card>
    </div>
  );
}
