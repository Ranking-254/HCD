// src/app/admin/vehicles/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPriceKes } from "@/lib/utils";
import {
  updateVehicleStatus,
  deleteVehicle,
} from "@/app/actions/adminVehicleActions";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import { VehicleStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
            Inventory Management
          </h1>
          <p className="text-xs text-slate-500">
            Control vehicle availability status, edit details, and manage
            listings.
          </p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-[#0B4FD8] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
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
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-bold text-slate-900">
                  {v.stockNumber}
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900">
                    {v.year} {v.make} {v.model}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {v.trim || v.bodyStyle}
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {formatPriceKes(Number(v.priceKes))}
                </td>
                <td className="px-4 py-3">{v.mileageKm.toLocaleString()} km</td>
                <td className="px-4 py-3">
                  <form
                    action={async (formData: FormData) => {
                      "use server";
                      const newStatus = formData.get("status") as VehicleStatus;
                      await updateVehicleStatus(v.id, newStatus);
                    }}
                  >
                    <select
                      name="status"
                      defaultValue={v.status}
                      aria-label="Vehicle Status"
                      className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold uppercase text-slate-700 outline-none"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                    </select>
                    <button
                      type="submit"
                      className="ml-2 rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 uppercase hover:bg-slate-200"
                    >
                      Update
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/vehicles/${v.id}/edit`}
                      title="Edit Vehicle"
                      className="text-slate-400 hover:text-[#0B4FD8] transition"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/inventory/${v.slug}`}
                      target="_blank"
                      title="View Public Page"
                      className="text-slate-400 hover:text-slate-800 transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteVehicle(v.id);
                      }}
                    >
                      <button
                        type="submit"
                        aria-label="Delete Vehicle"
                        title="Delete Vehicle"
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
