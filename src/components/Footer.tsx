// src/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1E2430] bg-[#0B0D10] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-white p-0.5">
                <Image
                  src="/logo.png"
                  alt="Honorable Car Dealers Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-wider text-white">
                  Honorable
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                  Car Dealers
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic">
              &quot;{siteConfig.motto}&quot;
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#0B4FD8]" />
              <span>Verified Vehicle Inspections & Import Documents</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              {siteConfig.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Showroom & Contacts
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#0B4FD8]" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#0B4FD8]" />
                <span>
                  {siteConfig.phone} (Director: {siteConfig.director})
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#0B4FD8]" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Legal & Trust
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="transition hover:text-white">
                  Current Inventory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
