// src/app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { VehicleCard } from "@/components/VehicleCard";
import { siteConfig } from "@/config/siteConfig";
import { Search, Shield, Award, Wrench, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredVehicles = await prisma.vehicle.findMany({
    where: { status: "AVAILABLE" },
    include: { images: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="flex flex-col">
      {/* Clean Structured Hero Section */}
      <section className="border-b border-[#1E2430] bg-[#0B0D10] text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded bg-[#0B4FD8] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Nairobi Showroom & Direct Imports
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl uppercase">
              Drive with Honor, <br />
              Arrive in Style.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Transparent car buying and importation in Kenya. Verified auction
              sheets, mechanical inspections, and pre-negotiated direct prices
              with zero hidden costs.
            </p>

            {/* Quick Action Matrix */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inventory"
                className="flex items-center gap-2 rounded-md bg-[#0B4FD8] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
              >
                <Search className="h-4 w-4" />
                <span>Browse Inventory</span>
              </Link>
              <Link
                href="/importation"
                className="flex items-center gap-2 rounded-md border border-slate-700 bg-[#12161C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-slate-800"
              >
                <span>Request Custom Import</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Pillars */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="rounded bg-[#EFF4FF] p-2.5 text-[#0B4FD8]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  Verified Inspections
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Authentic auction grade sheets and physical mechanical
                  inspection for every local and foreign used vehicle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded bg-[#EFF4FF] p-2.5 text-[#0B4FD8]">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  Direct Transparent Pricing
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Clear KES pricing with import duty, registration, and logbook
                  transfer assistance included upfront.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded bg-[#EFF4FF] p-2.5 text-[#0B4FD8]">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  After-Sales Support
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Guidance on insurance, financing partners, routine servicing,
                  and sourcing genuine parts in Nairobi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
                Available Stock
              </span>
              <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                Featured Vehicles
              </h2>
            </div>
            <Link
              href="/inventory"
              className="flex items-center gap-1.5 text-xs font-bold text-[#0B4FD8] uppercase hover:underline"
            >
              <span>View All Stock</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
