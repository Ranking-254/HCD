// src/app/terms-and-conditions/page.tsx
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions governing vehicle reservations, direct import agreements, and sales at ${siteConfig.name}.`,
};

export default function TermsAndConditionsPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Legal & Policy
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026
          </p>
        </div>

        <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6 sm:p-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              1. General Overview
            </h2>
            <p>
              These Terms and Conditions govern the sale of motor vehicles,
              direct import sourcing, and trade-in appraisals facilitated by{" "}
              <strong>{siteConfig.name}</strong>, operating under Director{" "}
              {siteConfig.director} in Nairobi, Kenya. By reserving a vehicle,
              submitting an import request, or engaging our services, you agree
              to adhere to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              2. Vehicle Pricing & Availability
            </h2>
            <p>
              All prices listed on this platform are quoted in Kenyan Shillings
              (KES) unless explicitly stated otherwise. While every effort is
              made to maintain accurate real-time inventory pricing:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                Prices for showroom inventory include applicable import duties
                and transfer facilitation unless specified as a duty-free or
                CIF-only unit.
              </li>
              <li>
                Vehicles are offered subject to prior sale or reservation. A
                vehicle remains available on the platform until a formal
                commitment deposit is documented.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              3. Vehicle Inspections & Descriptions
            </h2>
            <p>
              We pride ourselves on transparent disclosures. For foreign used
              import units, authentic auction sheets, chassis numbers, and
              export certificates are made available for client verification.
              Local used vehicles are subject to independent mechanical
              inspections. We encourage all buyers to physically inspect or
              appoint a certified third-party inspector prior to executing sales
              agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              4. Direct Importation Agreements
            </h2>
            <p>
              Custom import orders sourced from international auctions (Japan,
              UK, Thailand, Singapore) operate under formal CIF + Duty
              contractual terms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>Deposit:</strong> Sourcing commences upon receipt of the
                agreed auction purchasing deposit.
              </li>
              <li>
                <strong>KRA Duty & Port Clearance:</strong> Duty calculations
                follow current Kenya Revenue Authority (KRA) valuation schedules
                (CRSP). Any government duty rate or currency fluctuation
                adjustments occurring before port entry remain the
                responsibility of the purchaser.
              </li>
              <li>
                <strong>Delivery Timeline:</strong> Standard transit spans 45 to
                60 calendar days from auction release to port clearance in
                Mombasa and transit to Nairobi.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              5. Logbook Transfers & Registration
            </h2>
            <p>
              Vehicle ownership transfers are processed via the National
              Transport and Safety Authority (NTSA) TIMS / Citizen portal. Both
              buyer and seller must fulfill standard regulatory prerequisites,
              including valid KRA PIN certificates and National ID credentials,
              to complete ownership conveyance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              6. Contact Information
            </h2>
            <p>
              For legal inquiries, documentation clarification, or showroom
              visits:
            </p>
            <div className="rounded bg-slate-50 p-4 border border-slate-100 font-mono text-xs text-slate-800 space-y-1">
              <div>
                <strong>Dealership:</strong> {siteConfig.name}
              </div>
              <div>
                <strong>Location:</strong> {siteConfig.location}
              </div>
              <div>
                <strong>Phone:</strong> {siteConfig.phone}
              </div>
              <div>
                <strong>Email:</strong> {siteConfig.email}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
