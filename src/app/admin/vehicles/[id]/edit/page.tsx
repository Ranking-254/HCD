// src/app/admin/vehicles/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VehicleEditForm } from "@/components/VehicleEditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: PageProps) {
  const { id } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0B4FD8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to vehicles</span>
        </Link>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase text-[#0B4FD8]">
            Stock #{vehicle.stockNumber}
          </span>
          <h1 className="mt-1 text-lg font-black uppercase text-slate-900">
            Edit {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
        </div>

        <VehicleEditForm vehicle={vehicle} />
      </div>
    </div>
  );
}
