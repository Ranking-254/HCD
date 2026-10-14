// src/app/importation/page.tsx
import { siteConfig } from "@/config/siteConfig";
import {
  Ship,
  ShieldCheck,
  Clock,
  FileCheck,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: `Direct Car Importation Services | ${siteConfig.name}`,
  description:
    "Source and import clean cars directly from Japanese and UK auctions. Complete duty calculation, clearance, and delivery to Nairobi.",
};

export default function ImportationPage() {
  const waImportMsg = encodeURIComponent(
    "Hello Julius, I would like to request an import quotation for a specific vehicle.",
  );

  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Sourcing & Logistics
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Direct Car Importation
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Can&apos;t find your preferred model locally? We source directly
            from major auction houses across Japan, the United Kingdom, and
            Thailand with complete transparency from bid to registration.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EFF4FF] font-black text-xs text-[#0B4FD8]">
              01
            </div>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Vehicle Selection
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Define your preferred make, model, year, trim, and budget. We pull
              active auction sheets for review.
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EFF4FF] font-black text-xs text-[#0B4FD8]">
              02
            </div>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Pre-Bid Inspection
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Physical inspection at auction yard, odometer verification, and
              mechanical condition reports.
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EFF4FF] font-black text-xs text-[#0B4FD8]">
              03
            </div>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Shipping & Transit
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Secure maritime shipping to the port of Mombasa with marine
              insurance and live tracking updates.
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EFF4FF] font-black text-xs text-[#0B4FD8]">
              04
            </div>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Customs & Handover
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              KRA duty clearance, NTSA registration, number plate mounting, and
              direct handover in Nairobi.
            </p>
          </div>
        </div>

        {/* Benefits Matrix */}
        <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Why Import with Honorable Car Dealers
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0B4FD8] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900">
                  Original Mileage Only
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Every imported car comes with verified export certificates—no
                  tampered odometers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-[#0B4FD8] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900">
                  Zero Hidden Port Fees
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  We give you an itemized CIF + Duty breakdown upfront before
                  you commit any funds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#0B4FD8] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900">
                  45 to 60 Days Delivery
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Efficient shipping schedules from Yokohama/Southampton to
                  Mombasa and transit to Nairobi.
                </p>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Call to Action */}
          <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-900">
                Have a specific model in mind?
              </p>
              <p className="text-xs text-slate-500">
                Julius will provide an active auction estimate within 2 hours.
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${waImportMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#0B4FD8] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Request Import Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
