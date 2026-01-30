'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ScanLine, UploadCloud } from 'lucide-react';

interface ImageUploadFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function ImageUploadForm({ onSubmit, isLoading }: ImageUploadFormProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    // In a real app, we'd pass `imageUrl` or file data. For this simulation,
    // the presence of a URL or file name is enough to trigger the flow.
    onSubmit(imageUrl || fileName);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">ImageScribe</CardTitle>
        <CardDescription>Extract and format text from any image, instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (Simulated)</p>
              {fileName && <p className="text-xs text-primary mt-2">{fileName}</p>}
            </div>
            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading} />
          </label>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or paste URL</span>
          </div>
        </div>
        <div>
          <Label htmlFor="image-url" className="sr-only">
            Image URL
          </Label>
          <Input
            id="image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => {
                setImageUrl(e.target.value);
                setFileName('');
            }}
            disabled={isLoading}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full text-base py-6">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ScanLine className="mr-2 h-5 w-5" />
          )}
          {isLoading ? 'Extracting...' : 'Extract Text'}
        </Button>
      </CardFooter>
    </Card>
  );
}
