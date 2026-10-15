// src/components/ImageDropzone.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud, X, Star } from "lucide-react";
import Image from "next/image";

interface ImageDropzoneProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageDropzone({ images, onChange }: ImageDropzoneProps) {
  const handleRemove = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCover = (indexToPromote: number) => {
    if (indexToPromote === 0) return;
    const selected = images[indexToPromote];
    const filtered = images.filter((_, idx) => idx !== indexToPromote);
    onChange([selected, ...filtered]);
  };

  return (
    <div className="space-y-3">
      {/* Cloudinary Widget Uploader */}
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hcd-vehicles"
        }
        options={{
          multiple: true,
          maxFiles: 25,
          sources: ["local", "url"],
          // Allow all common image formats including AVIF and WebP
          clientAllowedFormats: ["png", "jpeg", "jpg", "webp", "avif"],
          showCompletedButton: true,
        }}
        onSuccess={(result: any) => {
          if (result?.info?.secure_url) {
            onChange([...images, result.info.secure_url]);
          }
        }}
      >
        {({ open }) => (
          <div
            onClick={() => open?.()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-[#0B4FD8] hover:bg-blue-50/20"
          >
            <UploadCloud className="h-8 w-8 text-[#0B4FD8] mb-2" />
            <p className="text-xs font-bold text-slate-800 uppercase">
              Click to upload vehicle photos
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports JPG, PNG, WEBP, and AVIF (up to 25 photos)
            </p>
          </div>
        )}
      </CldUploadWidget>

      {/* Uploaded Thumbnail Gallery with Quick Delete */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 pt-2">
          {images.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="group relative aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-2xs"
            >
              <Image
                src={url}
                alt={`Vehicle upload ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover"
              />

              {/* Cover Badge / Make Cover Button */}
              {idx === 0 ? (
                <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded bg-[#0B4FD8] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase shadow-xs">
                  <Star className="h-2.5 w-2.5 fill-white" />
                  Cover
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetCover(idx)}
                  title="Make this the Cover photo"
                  className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold text-white opacity-0 transition group-hover:opacity-100 hover:bg-[#0B4FD8]"
                >
                  Set Cover
                </button>
              )}

              {/* Remove / Delete Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                className="absolute top-1 right-1 rounded-full bg-red-600/90 p-1 text-white opacity-90 transition hover:bg-red-700 hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm"
                title="Remove photo"
              >
                <X className="h-3 w-3 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
