// src/components/VehicleGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleImage } from "@prisma/client";

export function VehicleGallery({
  images,
  title,
}: {
  images: VehicleImage[];
  title: string;
}) {
  const [activeImage, setActiveImage] = useState<string>(
    images[0]?.url ||
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80",
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Primary Display */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-900">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setActiveImage(img.url)}
              className={`relative aspect-[16/10] h-16 shrink-0 overflow-hidden rounded border transition ${
                activeImage === img.url
                  ? "border-[#0B4FD8] ring-1 ring-[#0B4FD8]"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
