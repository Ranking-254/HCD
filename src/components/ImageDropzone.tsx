// src/components/ImageDropzone.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { UploadCloud, X, Star } from "lucide-react";
import React from "react";

interface ImageDropzoneProps {
  images: string[];
  onChange:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((images: string[]) => void);
}

export function ImageDropzone({ images, onChange }: ImageDropzoneProps) {
  const addUploadedUrl = (url: string) => {
    // Use functional update if passed directly, or fallback safely
    if (typeof onChange === "function") {
      (onChange as any)((prev: string[] | string) => {
        const current = Array.isArray(prev) ? prev : images;
        if (current.includes(url)) return current;
        return [...current, url];
      });
    }
  };

  const handleUploadSuccess = (result: any) => {
    const uploadedUrl = result?.info?.secure_url;
    if (uploadedUrl) {
      addUploadedUrl(uploadedUrl);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (typeof onChange === "function") {
      (onChange as any)((prev: string[] | string) => {
        const current = Array.isArray(prev) ? prev : images;
        return current.filter((url) => url !== urlToRemove);
      });
    }
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    if (typeof onChange === "function") {
      (onChange as any)((prev: string[] | string) => {
        const current = Array.isArray(prev) ? [...prev] : [...images];
        const [selected] = current.splice(index, 1);
        current.unshift(selected); // Move to cover slot (index 0)
        return current;
      });
    }
  };

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hcd-vehicles"
        }
        options={{
          multiple: true,
          maxFiles: 15,
          sources: ["local", "camera", "url"],
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          theme: "minimal",
        }}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <div
            onClick={() => open()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-[#0B4FD8] hover:bg-slate-100/70"
          >
            <div className="rounded-full bg-white p-3 shadow-xs">
              <UploadCloud className="h-6 w-6 text-[#0B4FD8]" />
            </div>
            <p className="mt-2 text-xs font-bold uppercase text-slate-800">
              Click to upload vehicle photos or drag and drop
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Select exterior, interior, engine bay, and dashboard photos (JPG,
              PNG, WEBP)
            </p>
          </div>
        )}
      </CldUploadWidget>

      {/* Uploaded Photos Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className={`group relative aspect-[4/3] overflow-hidden rounded-md border ${
                idx === 0
                  ? "border-[#0B4FD8] ring-2 ring-[#0B4FD8]/20"
                  : "border-slate-200"
              }`}
            >
              <Image
                src={url}
                alt={`Vehicle upload ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />

              {/* Cover Badge */}
              {idx === 0 ? (
                <span className="absolute top-1.5 left-1.5 rounded bg-[#0B4FD8] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                  Cover
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetCover(idx)}
                  className="absolute top-1.5 left-1.5 hidden rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase backdrop-blur-xs group-hover:flex items-center gap-0.5 hover:bg-[#0B4FD8]"
                >
                  <Star className="h-2.5 w-2.5" />
                  <span>Set Cover</span>
                </button>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1.5 right-1.5 rounded bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
