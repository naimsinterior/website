
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Camera, RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface CameraCaptureProps {
  onPhotoTaken: (dataUri: string) => void;
}

export function CameraCapture({ onPhotoTaken }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const { toast } = useToast();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [zoomCapabilities, setZoomCapabilities] = useState<MediaTrackCapabilities["zoom"] | null>(null);

  const getVideoTrack = useCallback(() => {
    if (!stream) return null;
    return stream.getVideoTracks()[0];
  }, [stream]);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (hasCameraPermission === null) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setStream(stream);
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities();
          if (capabilities.zoom) {
            setZoomCapabilities(capabilities.zoom);
            setZoom(capabilities.zoom.min);
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
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // The dependency array is intentionally kept this way to run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    const track = getVideoTrack();
    if (track && zoomCapabilities) {
        if (newZoom >= zoomCapabilities.min && newZoom <= zoomCapabilities.max) {
           track.applyConstraints({ advanced: [{ zoom: newZoom }] });
           setZoom(newZoom);
        }
    }
  };
  
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

      {hasCameraPermission && !photoData && zoomCapabilities && (
        <div className="flex items-center gap-2">
            <ZoomOut className="h-5 w-5 text-muted-foreground" />
             <Slider
                value={[zoom]}
                min={zoomCapabilities.min}
                max={zoomCapabilities.max}
                step={zoomCapabilities.step}
                onValueChange={handleZoomChange}
                aria-label="Zoom"
            />
            <ZoomIn className="h-5 w-5 text-muted-foreground" />
        </div>
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
