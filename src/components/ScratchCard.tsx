
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface ScratchCardProps {
  beforeImage: string;
  afterImage: string;
  beforeHint: string;
  afterHint: string;
  onScratchComplete: () => void;
}

export function ScratchCard({ beforeImage, afterImage, beforeHint, afterHint, onScratchComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d', { willReadFrequently: true });
  }

  useEffect(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    
    const canvas = ctx.canvas;
    const image = new window.Image();
    image.crossOrigin = 'anonymous'; // Required for placehold.co images
    image.src = beforeImage;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      // Add centered text
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, canvas.height / 2 - 25, canvas.width, 50);

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 20px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch and see the transformation', canvas.width / 2, canvas.height / 2);

       // Add "Before" text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(5, 5, 55, 20);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('BEFORE', 10, 8);
    };
  }, [beforeImage]);

  const checkScratchPercentage = () => {
    const ctx = getCanvasContext();
    if (!ctx || hasPopped) return;

    const canvas = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = data.length / 4;
    const percentage = (transparentPixels / totalPixels) * 100;

    if (percentage > 30) {
        onScratchComplete();
        setHasPopped(true); 
    }
  }

  const getBrushPos = (xRef: number, yRef: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(((xRef - rect.left) / (rect.right - rect.left)) * canvas.width),
      y: Math.floor(((yRef - rect.top) / (rect.bottom - rect.top)) * canvas.height),
    };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    let mousePos;
    if ('touches' in e) {
      mousePos = getBrushPos(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      mousePos = getBrushPos(e.clientX, e.clientY);
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleMouseDown = () => setIsScratching(true);

  const handleMouseUp = () => {
    setIsScratching(false);
    checkScratchPercentage();
  };
  
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    draw(e);
  };


  return (
    <div className="relative aspect-video w-full cursor-grab active:cursor-grabbing rounded-md overflow-hidden">
      <Image
        src={afterImage}
        alt={afterHint}
        fill
        className="object-cover"
        data-ai-hint={afterHint}
      />
      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1 rounded z-10 pointer-events-none">
        After
      </div>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        className="absolute top-0 left-0 w-full h-full z-10"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
        onTouchMove={handleMouseMove}
      />
    </div>
  );
}
