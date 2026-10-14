// src/app/inventory/page.tsx
import { prisma } from "@/lib/prisma";
import { VehicleCard } from "@/components/VehicleCard";
import { InventoryFilters } from "@/components/InventoryFilters";
import { Prisma } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{
    make?: string;
    bodyStyle?: string;
    transmission?: string;
    fuelType?: string;
    condition?: string;
    sort?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function InventoryPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const whereClause: Prisma.VehicleWhereInput = {
    status: "AVAILABLE",
    ...(params.make && {
      make: { equals: params.make, mode: "insensitive" },
    }),
    ...(params.bodyStyle && {
      bodyStyle: { equals: params.bodyStyle, mode: "insensitive" },
    }),
    ...(params.transmission && {
      transmission: params.transmission as any,
    }),
    ...(params.fuelType && {
      fuelType: params.fuelType as any,
    }),
    ...(params.condition && {
      condition: params.condition as any,
    }),
  };

  const [vehicles, allMakesRaw, allStylesRaw] = await Promise.all([
    prisma.vehicle.findMany({
      where: whereClause,
      include: { images: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vehicle.findMany({
      select: { make: true },
      distinct: ["make"],
    }),
    prisma.vehicle.findMany({
      select: { bodyStyle: true },
      distinct: ["bodyStyle"],
    }),
  ]);

  const makes = allMakesRaw.map((v) => v.make);
  const bodyStyles = allStylesRaw.map((v) => v.bodyStyle);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Current Showroom Stock
          </span>
          <div className="mt-1 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight sm:text-3xl">
              All Vehicles
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Showing <span className="text-slate-900">{vehicles.length}</span>{" "}
              verified units
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <InventoryFilters makes={makes} bodyStyles={bodyStyles} />

          <main className="flex-1">
            {vehicles.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase">
                  No matching vehicles found
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try adjusting or clearing your filters to see available units.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
