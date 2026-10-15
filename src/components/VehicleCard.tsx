// src/components/VehicleCard.tsx
import Image from "next/image";
import Link from "next/link";
import { formatPriceKes } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { Gauge, Fuel, Cog, MessageSquare, ArrowRight } from "lucide-react";
import type { Vehicle, VehicleImage } from "@prisma/client";

interface VehicleWithImages extends Vehicle {
  images: VehicleImage[];
}

interface VehicleCardProps {
  vehicle: VehicleWithImages;
  index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const coverImage =
    vehicle.images.find((img) => img.isCover)?.url ||
    vehicle.images[0]?.url ||
    "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80";

  const conditionLabel =
    vehicle.condition === "FOREIGN_USED"
      ? "Foreign Used"
      : vehicle.condition === "BRAND_NEW"
        ? "Brand New"
        : "Local Used";

  const waMessage = `Hello Julius, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Stock: ${vehicle.stockNumber}) listed for ${formatPriceKes(Number(vehicle.priceKes))}. Is it available?`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-xs">
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={coverImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="rounded bg-[#0B0D10]/80 px-2.5 py-1 text-[11px] font-semibold text-white uppercase backdrop-blur-xs">
            {conditionLabel}
          </span>
          {vehicle.featured && (
            <span className="rounded bg-[#0B4FD8] px-2.5 py-1 text-[11px] font-semibold text-white uppercase">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
          {vehicle.stockNumber}
        </div>
        <h3 className="mt-1 font-bold text-slate-900 group-hover:text-[#0B4FD8]">
          <Link href={`/inventory/${vehicle.slug}`}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Link>
        </h3>
        {vehicle.trim && (
          <p className="text-xs text-slate-500">{vehicle.trim}</p>
        )}

        {/* Spec Pill Bar */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-slate-400" />
            <span>{vehicle.mileageKm.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog className="h-3.5 w-3.5 text-slate-400" />
            <span className="capitalize">
              {vehicle.transmission.toLowerCase()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-slate-400" />
            <span className="capitalize">{vehicle.fuelType.toLowerCase()}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-4">
          <div className="text-lg font-black tracking-tight text-slate-900">
            {formatPriceKes(Number(vehicle.priceKes))}
          </div>
          {vehicle.previousPriceKes && (
            <div className="text-xs text-slate-400 line-through">
              {formatPriceKes(Number(vehicle.previousPriceKes))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2 pt-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              waMessage,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#0B4FD8]" />
            <span>Inquire</span>
          </a>
          <Link
            href={`/inventory/${vehicle.slug}`}
            className="flex items-center justify-center gap-1.5 rounded-md bg-[#0B4FD8] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#003296]"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
