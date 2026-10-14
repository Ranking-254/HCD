// src/app/trade-in/page.tsx
import { siteConfig } from "@/config/siteConfig";
import { ArrowLeftRight, CheckCircle2, MessageSquare } from "lucide-react";

export const metadata = {
  title: `Trade-In Your Vehicle | ${siteConfig.name}`,
  description:
    "Upgrade your car seamlessly. Bring your current car for fair market valuation and offset the cost of your next vehicle in Nairobi.",
};

export default function TradeInPage() {
  const waTradeMsg = encodeURIComponent(
    "Hello Julius, I would like to trade in my current vehicle. Here are the details:\nMake & Model:\nYear:\nMileage:\nRegistration:",
  );

  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Vehicle Upgrade Program
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Trade-In Your Car
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Upgrade your ride without the hassle of selling privately. Trade in
            your current vehicle and apply its evaluated market value directly
            toward any unit in our inventory.
          </p>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <span className="text-xs font-bold uppercase text-[#0B4FD8]">
              Step 1
            </span>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Send Car Specs
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Share your car&apos;s make, model, registration year, current
              mileage, and photos of the interior and exterior.
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <span className="text-xs font-bold uppercase text-[#0B4FD8]">
              Step 2
            </span>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Physical Appraisal
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bring your car to our Nairobi showroom for a 20-minute physical
              condition and mechanical inspection.
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 space-y-2">
            <span className="text-xs font-bold uppercase text-[#0B4FD8]">
              Step 3
            </span>
            <h3 className="text-xs font-bold uppercase text-slate-900">
              Drive Away
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Offset your trade-in offer against your selected upgrade and
              complete logbook transfer smoothly.
            </p>
          </div>
        </div>

        {/* Requirements Box */}
        <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Documents Needed for Appraisal
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0B4FD8]" />
              <span>Original Logbook in owner&apos;s name</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0B4FD8]" />
              <span>National ID and KRA PIN certificate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0B4FD8]" />
              <span>
                Active comprehensive or third-party insurance certificate
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0B4FD8]" />
              <span>Recent service history records (if available)</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${waTradeMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#0B4FD8] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Start WhatsApp Trade-In Appraisal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
