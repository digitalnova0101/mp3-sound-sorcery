
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoUploader from '@/components/VideoUploader';
import VideoPreview from '@/components/VideoPreview';
import ConversionSection from '@/components/ConversionSection';
import { useConversion } from '@/hooks/useConversion';

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const {
    isConverting,
    progress,
    result,
    recentConversions,
    startConversion,
    downloadResult
  } = useConversion();

  const handleVideoSelect = (file: File) => {
    setVideoFile(file);
  };

  const handleStartConversion = async (quality: 'low' | 'medium' | 'high') => {
    if (!videoFile) return;
    await startConversion(videoFile, { quality });
  };

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-blue-50 to-slate-50">
      <Header />
      
      <main className="flex-1 container px-4 py-8 max-w-5xl">
        <div className="text-center mb-10 space-y-3 animate-slide-down">
          <p className="text-sm font-medium text-primary">AUDIO EXTRACTION TOOL</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Transform Videos into <span className="text-primary">High-Quality Audio</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Extract the audio track from any video and convert it to MP3 format with just a few clicks.
            Select your desired quality and download instantly.
          </p>
        </div>
        
        <VideoUploader onVideoSelect={handleVideoSelect} />
        
        {videoFile && (
          <VideoPreview videoFile={videoFile} />
        )}
        
        <ConversionSection
          videoFile={videoFile}
          isConverting={isConverting}
          progress={progress}
          result={result}
          recentConversions={recentConversions}
          onStartConversion={handleStartConversion}
          onDownload={downloadResult}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
