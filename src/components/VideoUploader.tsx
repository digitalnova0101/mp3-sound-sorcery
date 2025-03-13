
import React, { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    // Check if the file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    onVideoSelect(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div 
        className={`
          relative rounded-lg border-2 border-dashed p-8 transition-all duration-200 ease-in-out
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : selectedFile ? 'border-green-500 bg-green-50' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
        
        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary/80" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Upload your video</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop your video file here, or click to browse
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={openFileSelector}
              className="transition-all duration-300 ease-in-out hover:shadow-md hover:bg-primary hover:text-primary-foreground"
            >
              Select Video
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Max file size: 500MB. Supported formats: MP4, MOV, AVI, WebM
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-primary/10">
              <File className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{selectedFile.name}</h3>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
