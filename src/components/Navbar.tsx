// src/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Phone, MessageSquare } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2430] bg-[#0B0D10] text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-white p-0.5">
            <Image
              src="/logo.png"
              alt="Honorable Car Dealers Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider uppercase text-white">
              HONORABLE
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
              CAR DEALERS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Link href="/inventory" className="transition hover:text-white">
            Inventory
          </Link>
          <Link href="/importation" className="transition hover:text-white">
            Car Importation
          </Link>
          <Link href="/trade-in" className="transition hover:text-white">
            Trade-In
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About & Showroom
          </Link>
        </nav>

        {/* Quick Contact Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="hidden sm:flex items-center gap-2 rounded border border-slate-700 bg-[#12161C] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            <Phone className="h-3.5 w-3.5 text-[#0B4FD8]" />
            <span>Call {siteConfig.phone}</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded bg-[#0B4FD8] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
