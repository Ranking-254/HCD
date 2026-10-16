// src/app/admin/vehicles/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPriceKes } from "@/lib/utils";
import { VehicleStatus } from "@prisma/client";
import { Plus, Edit, ExternalLink, Trash2 } from "lucide-react";
// Import your status update action or component if you have one
import {
  updateVehicleStatus,
  deleteVehicle,
} from "@/app/actions/adminVehicleActions";

export const dynamic = "force-dynamic";

interface AdminVehiclesPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminVehiclesPage({
  searchParams,
}: AdminVehiclesPageProps) {
  const resolvedParams = await searchParams;
  const currentStatus = resolvedParams.status as VehicleStatus | undefined;

  // 1. Fetch counts in parallel for fast stats
  const [totalCount, availableCount, reservedCount, soldCount, vehicles] =
    await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
      prisma.vehicle.count({ where: { status: "RESERVED" } }),
      prisma.vehicle.count({ where: { status: "SOLD" } }),
      prisma.vehicle.findMany({
        where: currentStatus ? { status: currentStatus } : undefined,
        orderBy: { createdAt: "desc" },
        include: { images: true },
      }),
    ]);

  const filterTabs = [
    { label: "All Stock", value: undefined, count: totalCount },
    { label: "Available", value: "AVAILABLE", count: availableCount },
    { label: "Reserved", value: "RESERVED", count: reservedCount },
    { label: "Sold", value: "SOLD", count: soldCount },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
              Inventory Management
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              {totalCount} Units Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Control vehicle availability status, edit details, and manage
            listings.
          </p>
        </div>

        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#0B4FD8] px-4 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#003296] transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* Filter Tabs & Stock Counter Badges */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => {
          const isActive =
            tab.value === currentStatus || (!tab.value && !currentStatus);

          return (
            <Link
              key={tab.label}
              href={
                tab.value
                  ? `/admin/vehicles?status=${tab.value}`
                  : "/admin/vehicles"
              }
              className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-bold transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.2 text-[10px] ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Vehicles Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-md border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[750px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Stock No</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Mileage</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {vehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-slate-400"
                >
                  No vehicles found under this filter.
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {vehicle.stockNumber}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    {vehicle.trim && (
                      <div className="text-[11px] text-slate-400">
                        {vehicle.trim}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {formatPriceKes(Number(vehicle.priceKes))}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {vehicle.mileageKm.toLocaleString()} km
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={async (formData) => {
                        "use server";
                        const nextStatus = formData.get(
                          "status",
                        ) as VehicleStatus;
                        await updateVehicleStatus(vehicle.id, nextStatus);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <select
                        name="status"
                        defaultValue={vehicle.status}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold uppercase text-slate-700 outline-none focus:border-[#0B4FD8]"
                      >
                        <option value="AVAILABLE">Available</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="SOLD">Sold</option>
                      </select>
                      <button
                        type="submit"
                        className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600 hover:bg-slate-200 transition"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/vehicles/${vehicle.id}/edit`}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        title="Edit Vehicle"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/inventory/${vehicle.slug}`}
                        target="_blank"
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#0B4FD8] transition"
                        title="View Public Page"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteVehicle(vehicle.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
