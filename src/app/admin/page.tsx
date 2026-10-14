// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPriceKes } from "@/lib/utils";
import { Car, CheckCircle, Clock, Plus, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalVehicles, availableVehicles, soldVehicles, recentLeads] =
    await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
      prisma.vehicle.count({ where: { status: "SOLD" } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { vehicle: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
            Dealership Overview
          </h1>
          <p className="text-xs text-slate-500">
            Real-time stock status and incoming customer inquiries.
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">
              Available Stock
            </span>
            <Car className="h-4 w-4 text-[#0B4FD8]" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {availableVehicles}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Total listed: {totalVehicles} units
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">
              Sold Vehicles
            </span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {soldVehicles}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Archived from live listings
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Inquiries
            </span>
            <Users className="h-4 w-4 text-[#0B4FD8]" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {recentLeads.length}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Recent bookings and leads
          </p>
        </div>
      </div>

      {/* Recent Leads Feed */}
      <div className="rounded-md border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Recent Customer Inquiries
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-[#0B4FD8] uppercase hover:underline"
          >
            View All
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">
            No inquiries received yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">
                    {lead.fullName}
                  </span>
                  <span className="text-slate-400 ml-2">({lead.phone})</span>
                  {lead.vehicle && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Target: {lead.vehicle.year} {lead.vehicle.make}{" "}
                      {lead.vehicle.model} ({lead.vehicle.stockNumber})
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                    {lead.type.replace("_", " ")}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
