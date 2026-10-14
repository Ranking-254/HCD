// src/app/admin/leads/page.tsx
import { prisma } from "@/lib/prisma";
import { MessageSquare, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { vehicle: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
          Customer Inquiries & Test Drives
        </h1>
        <p className="text-xs text-slate-500">
          Direct contact inquiries captured via web forms and modals.
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Associated Vehicle</th>
              <th className="px-4 py-3">Date Received</th>
              <th className="px-4 py-3 text-right">Direct Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  No inquiries received yet. Submit a test drive booking from
                  any vehicle page to view entries here.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">
                      {lead.fullName}
                    </div>
                    {lead.email && (
                      <div className="text-[11px] text-slate-400">
                        {lead.email}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">{lead.phone}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                      {lead.type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {lead.vehicle ? (
                      <div>
                        <span className="font-bold text-slate-900">
                          {lead.vehicle.year} {lead.vehicle.make}{" "}
                          {lead.vehicle.model}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-1">
                          ({lead.vehicle.stockNumber})
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">General Inquiry</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100 transition"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="rounded bg-slate-100 p-1.5 text-slate-700 hover:bg-slate-200 transition"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
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
