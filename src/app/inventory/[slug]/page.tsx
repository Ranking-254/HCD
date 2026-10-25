// src/app/inventory/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPriceKes } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { VehicleGallery } from "@/components/VehicleGallery";
import { PaymentCalculator } from "@/components/PaymentCalculator";
import { TestDriveModal } from "@/components/TestDriveModal";
import { WhatsAppShareButton } from "@/components/WhatsAppShareButton";
import {
  MessageSquare,
  Phone,
  Check,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Ensure production fallback points to your real domain (hcd-motors.vercel.app)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hcd-motors.vercel.app";

// Resizes Cloudinary images to standard 1200x630 JPEG to stay well under WhatsApp's 300KB limit
function getOptimizedThumbnail(imageUrl: string | undefined): string {
  if (!imageUrl) return `${SITE_URL}/og-default.jpg`;
  if (imageUrl.includes("cloudinary.com")) {
    return imageUrl.replace(
      "/upload/",
      "/upload/c_fill,w_1200,h_630,g_auto,q_80,f_jpg/",
    );
  }
  return imageUrl;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!vehicle) return { title: "Vehicle Not Found" };

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} for Sale | ${siteConfig.name}`;
  const description = `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.trim || ""}). ${vehicle.mileageKm.toLocaleString()} km, ${vehicle.fuelType}, ${vehicle.transmission}. Price: ${formatPriceKes(Number(vehicle.priceKes))}.`;

  const coverImage =
    vehicle.images.find((img) => img.isCover)?.url || vehicle.images[0]?.url;

  const ogImageUrl = getOptimizedThumbnail(coverImage);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/inventory/${vehicle.slug}`,
      siteName: siteConfig.name,
      locale: "en_KE",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!vehicle) {
    notFound();
  }

  const waMessage = `Hello Julius, I am inquiring about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Stock No: ${vehicle.stockNumber}) listed at ${formatPriceKes(Number(vehicle.priceKes))}. Is it still available for viewing?`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    image: vehicle.images[0]?.url,
    vehicleIdentificationNumber: vehicle.vin,
    modelDate: vehicle.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileageKm,
      unitCode: "KMT",
    },
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: vehicle.priceKes.toString(),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb / Back Navigation */}
          <div>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B4FD8]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all vehicles</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left 2 Cols: Gallery, Overview & Specs */}
            <div className="lg:col-span-2 space-y-8">
              <VehicleGallery
                images={vehicle.images}
                title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />

              {/* Title & Overview */}
              <div className="rounded-md border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#0B0D10] px-2 py-0.5 text-[11px] font-semibold text-white uppercase">
                    {vehicle.condition.replace("_", " ")}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Stock #{vehicle.stockNumber}
                  </span>
                </div>

                <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                {vehicle.trim && (
                  <p className="text-sm font-semibold text-slate-500">
                    {vehicle.trim}
                  </p>
                )}

                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                    Vehicle Overview
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {vehicle.description}
                  </p>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="rounded-md border border-slate-200 bg-white p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                  Technical Specifications
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-6 sm:grid-cols-3 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Make
                    </span>
                    <p className="font-bold text-slate-900">{vehicle.make}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Model
                    </span>
                    <p className="font-bold text-slate-900">{vehicle.model}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Year
                    </span>
                    <p className="font-bold text-slate-900">{vehicle.year}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Mileage
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.mileageKm.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Transmission
                    </span>
                    <p className="font-bold text-slate-900 capitalize">
                      {vehicle.transmission.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Fuel Type
                    </span>
                    <p className="font-bold text-slate-900 capitalize">
                      {vehicle.fuelType.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Drivetrain
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.drivetrain.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Engine Size
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.engineSizeCc
                        ? `${vehicle.engineSizeCc} cc`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Exterior Color
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.exteriorColor}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      Interior Color
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.interiorColor || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">
                      VIN / Chassis
                    </span>
                    <p className="font-bold text-slate-900">
                      {vehicle.vin || "Available upon request"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              {vehicle.features.length > 0 && (
                <div className="rounded-md border border-slate-200 bg-white p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                    Installed Features & Equipment
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                    {vehicle.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-slate-700"
                      >
                        <Check className="h-3.5 w-3.5 text-[#0B4FD8]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Conversion & Direct Actions */}
            <div className="space-y-6">
              {/* Pricing & Primary Action Card */}
              <div className="rounded-md border border-slate-200 bg-white p-6 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500">
                    Offered Price (KES)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {formatPriceKes(Number(vehicle.priceKes))}
                  </div>
                  {vehicle.previousPriceKes && (
                    <div className="text-xs text-slate-400 line-through">
                      {formatPriceKes(Number(vehicle.previousPriceKes))}
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      waMessage,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0B4FD8] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  {/* WhatsApp Broadcast / Share Button */}
                  <WhatsAppShareButton
                    year={vehicle.year}
                    make={vehicle.make}
                    model={vehicle.model}
                    trim={vehicle.trim}
                    slug={vehicle.slug}
                    priceKes={Number(vehicle.priceKes)}
                    stockNumber={vehicle.stockNumber}
                    variant="button"
                  />

                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white py-3 text-xs font-bold uppercase tracking-wider text-slate-800 transition hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Showroom</span>
                  </a>

                  <TestDriveModal
                    vehicleId={vehicle.id}
                    vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0B4FD8]" />
                    <span>Physical inspection report available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0B4FD8]" />
                    <span>Logbook transfer & delivery handled</span>
                  </div>
                </div>
              </div>

              {/* Loan Payment Calculator */}
              <PaymentCalculator priceKes={Number(vehicle.priceKes)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
