'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ScanLine, UploadCloud } from 'lucide-react';

interface ImageUploadFormProps {
  onSubmit: (data: { file?: File }) => void;
  isLoading: boolean;
}

export function ImageUploadForm({ onSubmit, isLoading }: ImageUploadFormProps) {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit({ file });
    }
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
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
              {fileName && <p className="text-xs text-primary mt-2">{fileName}</p>}
            </div>
            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading} />
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full text-base py-6">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ScanLine className="mr-2 h-5 w-5" />
          )}
          {isLoading ? 'Processing...' : 'Extract Text'}
        </Button>
      </CardFooter>
    </Card>
  );
}
