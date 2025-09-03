
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Camera, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraCaptureProps {
  onPhotoTaken: (dataUri: string) => void;
}

export function CameraCapture({ onPhotoTaken }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (hasCameraPermission === null) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup stream on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast, hasCameraPermission]);

  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setPhotoData(dataUri);
      }
    }
  };
  
  const handleConfirmPhoto = () => {
    if (photoData) {
      onPhotoTaken(photoData);
    }
  };

  const handleRetakePhoto = () => {
    setPhotoData(null);
  };

  return (
    <div className="space-y-4">
      <div className={cn("relative w-full aspect-video bg-muted rounded-md overflow-hidden", hasCameraPermission === false && "hidden")}>
        <video ref={videoRef} className={cn("w-full h-full object-cover", photoData && "hidden")} autoPlay muted playsInline />
        {photoData && (
          <img src={photoData} alt="Captured photo" className="w-full h-full object-cover" />
        )}
         <canvas ref={canvasRef} className="hidden" />
      </div>

      {hasCameraPermission === false && (
        <Alert variant="destructive">
          <Camera className="h-4 w-4" />
          <AlertTitle>Camera Access Required</AlertTitle>
          <AlertDescription>
            Please allow camera access in your browser to use this feature. You may need to refresh the page after granting permissions.
          </AlertDescription>
        </Alert>
      )}

      {hasCameraPermission && (
        <div className="flex justify-center gap-4">
          {photoData ? (
             <>
               <Button onClick={handleRetakePhoto} variant="outline">
                 <RefreshCcw className="mr-2 h-4 w-4" />
                 Retake
               </Button>
               <Button onClick={handleConfirmPhoto}>
                 Confirm Photo
               </Button>
             </>
          ) : (
             <Button onClick={handleTakePhoto} disabled={!hasCameraPermission}>
                 <Camera className="mr-2 h-4 w-4" />
                 Take Photo
             </Button>
          )}
        </div>
      )}
    </div>
  );
}
