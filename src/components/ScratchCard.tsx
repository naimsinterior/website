
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface ScratchCardProps {
  beforeImage: string;
  afterImage: string;
  beforeHint: string;
  afterHint: string;
}

export function ScratchCard({ beforeImage, afterImage, beforeHint, afterHint }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new window.Image();
    image.crossOrigin = 'anonymous'; // Required for placehold.co images
    image.src = beforeImage;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      // Add "Before" text
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(5, 5, 55, 20);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('BEFORE', 10, 19);
    };
  }, [beforeImage]);

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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

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
  const handleMouseUp = () => setIsScratching(false);

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
        onMouseMove={draw}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
        onTouchMove={draw}
      />
    </div>
  );
}
