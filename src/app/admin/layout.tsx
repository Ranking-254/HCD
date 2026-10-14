// src/app/admin/layout.tsx
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Car, Users, LayoutDashboard, ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Admin Sub-bar */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="rounded bg-[#0B0D10] px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
              Dealer Portal
            </span>
            <nav className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 transition hover:text-[#0B4FD8]"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/vehicles"
                className="flex items-center gap-1.5 transition hover:text-[#0B4FD8]"
              >
                <Car className="h-3.5 w-3.5" />
                <span>Vehicles</span>
              </Link>
              <Link
                href="/admin/leads"
                className="flex items-center gap-1.5 transition hover:text-[#0B4FD8]"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Leads</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <UserButton />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
