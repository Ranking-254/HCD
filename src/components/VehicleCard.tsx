// src/components/WhatsAppShareButton.tsx
"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { formatPriceKes } from "@/lib/utils";

interface WhatsAppShareButtonProps {
  year: number;
  make: string;
  model: string;
  trim?: string | null;
  slug: string;
  priceKes: number;
  stockNumber: string;
  variant?: "floating" | "button";
}

export function WhatsAppShareButton({
  year,
  make,
  model,
  trim,
  slug,
  priceKes,
  stockNumber,
  variant = "floating",
}: WhatsAppShareButtonProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://hcd-motors.vercel.app";

    const carUrl = `${baseUrl}/inventory/${slug}`;
    const formattedPrice = formatPriceKes(priceKes);
    const vehicleTitle = `${year} ${make} ${model}${trim ? ` ${trim}` : ""}`;

    const messageText = [
      `🚗 *${vehicleTitle}*`,
      `💰 *Price:* ${formattedPrice}`,
      `📌 *Stock No:* ${stockNumber}`,
      `📍 *Honorable Car Dealers*`,
      ``,
      `View photos, full specifications & book a test drive:`,
      carUrl,
    ].join("\n");

    // Native Mobile Share
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        // NOTE: Only pass text here so the link is NOT duplicated!
        await navigator.share({
          title: vehicleTitle,
          text: messageText,
        });
        return;
      } catch (err) {
        // Fallback to direct WhatsApp URL if dismissed
      }
    }

    // Direct WhatsApp Web / Mobile URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      messageText,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleShare}
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#20ba5a] active:scale-[0.99]"
      >
        <Share2 className="h-4 w-4" />
        <span>Share / Post to WhatsApp</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      type="button"
      title="Share / Post to WhatsApp"
      aria-label="Share vehicle"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur-xs transition hover:bg-[#25D366] hover:text-white"
    >
      <Share2 className="h-3.5 w-3.5" />
    </button>
  );
}
