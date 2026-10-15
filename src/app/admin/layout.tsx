// Inside src/app/admin/layout.tsx
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Car, Users, Globe } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6">
          {/* Brand Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-900 px-2 py-1 text-[11px] font-black tracking-wider text-white uppercase sm:text-xs">
              Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-4 text-xs font-bold uppercase text-slate-600">
            <Link
              href="/admin"
              className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Dashboard</span>
            </Link>
            <Link
              href="/admin/vehicles"
              className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <Car className="h-3.5 w-3.5" />
              <span>Vehicles</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Leads</span>
            </Link>
          </nav>

          {/* Right: Live Site Link & Clerk User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              title="View Customer Website"
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <Globe className="h-3.5 w-3.5 text-[#0B4FD8]" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6">{children}</main>
    </div>
  );
}
