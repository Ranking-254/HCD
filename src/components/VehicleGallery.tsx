// src/components/VehicleGallery.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

interface VehicleImageItem {
  id?: string;
  url: string;
  isCover?: boolean;
}

interface VehicleGalleryProps {
  images: VehicleImageItem[];
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const displayImages =
    images.length > 0
      ? images
      : [{ url: "/placeholder-car.jpg", isCover: true }];

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      resetZoom();
      setSelectedIndex((prev) => {
        if (prev === null) return null;
        return prev === 0 ? displayImages.length - 1 : prev - 1;
      });
    },
    [displayImages.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      resetZoom();
      setSelectedIndex((prev) => {
        if (prev === null) return null;
        return prev === displayImages.length - 1 ? 0 : prev + 1;
      });
    },
    [displayImages.length],
  );

  const resetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Drag to pan when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel === 1) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Bounds check to stop panning too far off screen
    const limit = (zoomLevel - 1) * 200;
    setPanPosition({
      x: Math.max(-limit, Math.min(limit, newX)),
      y: Math.max(-limit, Math.min(limit, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard controls for modal
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      {/* Label and Info */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white">
          Images
        </h3>
        <p className="text-[11px] text-slate-400 mt-1">
          Tap any image to expand & zoom
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {displayImages.map((img, idx) => (
          <button
            key={`${img.url}-${idx}`}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-800 bg-[#0B0D10] transition hover:scale-[1.02] hover:border-slate-500 duration-150"
          >
            <Image
              src={img.url}
              alt={`${title} view ${idx + 1}`}
              fill
              priority={idx === 0} // Loads the first/cover photo immediately, lazily loads the rest
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
              <span className="rounded-full bg-black/60 p-2 text-white">
                <ZoomIn className="h-4 w-4" />
              </span>
            </div>
            {img.isCover && (
              <span className="absolute top-2 left-2 rounded bg-[#0B4FD8] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                Cover
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
          onMouseUp={handleMouseUp}
        >
          {/* Top action / info bar */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider md:text-sm">
                {title}
              </p>
              <p className="text-[10px] text-slate-400 md:text-xs">
                Photo {selectedIndex + 1} of {displayImages.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition disabled:opacity-40"
                disabled={zoomLevel === 1}
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition disabled:opacity-40"
                disabled={zoomLevel === 3}
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="ml-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Large display area with swipe and zoom functionality */}
          <div
            className="relative flex h-[75vh] w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {/* Nav Arrows (Hidden when zooming/panning deeply) */}
            {displayImages.length > 1 && zoomLevel === 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-3 text-white backdrop-blur-xs hover:bg-[#0B4FD8] transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-3 text-white backdrop-blur-xs hover:bg-[#0B4FD8] transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Interactive Image Frame */}
            <div
              className={`relative h-full w-full select-none ${zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              <Image
                src={displayImages[selectedIndex]?.url}
                alt={`${title} expanded`}
                fill
                priority
                className="object-contain pointer-events-none"
                sizes="90vw"
              />
            </div>
          </div>

          {/* Optional: Carousel timeline thumbnail preview at bottom */}
          {displayImages.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[85vw] px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages.map((img, idx) => (
                <button
                  key={`thumb-lg-${idx}`}
                  onClick={() => {
                    resetZoom();
                    setSelectedIndex(idx);
                  }}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border transition-all ${
                    selectedIndex === idx
                      ? "border-[#0B4FD8] scale-105 ring-2 ring-[#0B4FD8]/40"
                      : "border-slate-800 opacity-50"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
