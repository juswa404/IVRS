import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
interface FileUploadProps {
  onFileSelect: (file: File) => void;
}
export const FileUpload = ({
  onFileSelect
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return <div className="space-y-2">
      <div onClick={() => fileInputRef.current?.click()} className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-blue-500">
        <Upload className="h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 10MB</p>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>;
};