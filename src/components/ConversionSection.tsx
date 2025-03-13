
import React, { useState } from 'react';
import { 
  Download, 
  Music, 
  Check, 
  RotateCw,
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ConversionResult } from '@/utils/videoConverter';
import { formatFileSize, formatDuration } from '@/utils/videoConverter';

interface ConversionSectionProps {
  videoFile: File | null;
  isConverting: boolean;
  progress: number;
  result: ConversionResult | null;
  recentConversions: ConversionResult[];
  onStartConversion: (quality: 'low' | 'medium' | 'high') => void;
  onDownload: (result: ConversionResult) => void;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({
  videoFile,
  isConverting,
  progress,
  result,
  recentConversions,
  onStartConversion,
  onDownload,
}) => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 space-y-8 animate-fade-in">
      {/* Conversion Options */}
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Conversion Options</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Audio Quality
            </label>
            <Select 
              value={quality} 
              onValueChange={(value) => setQuality(value as 'low' | 'medium' | 'high')}
              disabled={isConverting || !videoFile}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (128 kbps)</SelectItem>
                <SelectItem value="medium">Medium (256 kbps)</SelectItem>
                <SelectItem value="high">High (320 kbps)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            className="w-full transition-all duration-300 hover:shadow-md"
            onClick={() => onStartConversion(quality)}
            disabled={isConverting || !videoFile}
          >
            {isConverting ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Convert to MP3
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Conversion Progress */}
      {isConverting && (
        <div className="p-6 bg-white rounded-lg shadow-sm border animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Converting...</h2>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-right">
            {Math.round(progress)}%
          </p>
        </div>
      )}
      
      {/* Conversion Result */}
      {result && !isConverting && (
        <div className="p-6 bg-white rounded-lg shadow-sm border animate-fade-in">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Conversion Complete</h2>
              <p className="text-sm text-muted-foreground">
                Your MP3 file is ready to download
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">File name:</span>
              <span className="font-medium">{result.filename}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quality:</span>
              <span className="font-medium capitalize">{quality}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">{formatFileSize(result.size)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{formatDuration(result.duration)}</span>
            </div>
          </div>
          
          <Button
            className="w-full transition-all duration-300 hover:shadow-md"
            onClick={() => onDownload(result)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download MP3
          </Button>
        </div>
      )}
      
      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow-sm border animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Recent Conversions</h2>
          <div className="space-y-3">
            {recentConversions.map((conversion, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Music className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {conversion.filename}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDuration(conversion.duration)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatFileSize(conversion.size)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(conversion)}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversionSection;
