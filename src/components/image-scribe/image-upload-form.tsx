'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ScanText, UploadCloud } from 'lucide-react';

interface ImageUploadFormProps {
  onSubmit: (data: { file?: File }) => void;
  isLoading: boolean;
}

export function ImageUploadForm({ onSubmit, isLoading }: ImageUploadFormProps) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile.name);
      onSubmit({ file: selectedFile });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <ScanText className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tight">BenSalah</CardTitle>
        </div>
        <CardDescription>Upload an image to automatically extract text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isLoading ? (
                <Loader2 className="w-10 h-10 mb-3 text-muted-foreground animate-spin" />
              ) : (
                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
              )}
              <p className="mb-2 text-sm text-muted-foreground">
                {isLoading ? 'Processing...' : <><span className="font-semibold">Click to upload</span> or drag and drop</>}
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
              {fileName && !isLoading && <p className="text-xs text-primary mt-2">{fileName}</p>}
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              disabled={isLoading}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
