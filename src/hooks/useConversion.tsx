
import { useState, useCallback } from 'react';
import { 
  convertVideoToMP3, 
  ConversionOptions, 
  ConversionResult 
} from '@/utils/videoConverter';
import { useToast } from '@/components/ui/use-toast';

export interface ConversionState {
  isConverting: boolean;
  progress: number;
  result: ConversionResult | null;
  recentConversions: ConversionResult[];
}

export const useConversion = () => {
  const [state, setState] = useState<ConversionState>({
    isConverting: false,
    progress: 0,
    result: null,
    recentConversions: [],
  });
  
  const { toast } = useToast();

  const startConversion = useCallback(async (
    file: File, 
    options: ConversionOptions
  ) => {
    try {
      setState(prev => ({ ...prev, isConverting: true, progress: 0 }));
      
      const updateProgress = (progress: number) => {
        setState(prev => ({ ...prev, progress }));
      };
      
      const result = await convertVideoToMP3(file, options, updateProgress);
      
      // Add to recent conversions (keeping only the last 5)
      setState(prev => ({
        ...prev,
        isConverting: false,
        progress: 100,
        result,
        recentConversions: [result, ...prev.recentConversions].slice(0, 5)
      }));
      
      toast({
        title: "Conversion Complete",
        description: `${file.name} has been converted to MP3 successfully.`,
      });
      
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, isConverting: false }));
      
      toast({
        title: "Conversion Failed",
        description: `There was an error converting your file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
      
      throw error;
    }
  }, [toast]);
  
  const downloadResult = useCallback((result: ConversionResult) => {
    // Create a download link
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.filename;
    
    // Append to body, click, and remove
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  }, []);
  
  const clearResult = useCallback(() => {
    if (state.result?.url) {
      URL.revokeObjectURL(state.result.url);
    }
    setState(prev => ({ ...prev, result: null }));
  }, [state.result]);
  
  return {
    ...state,
    startConversion,
    downloadResult,
    clearResult
  };
};
