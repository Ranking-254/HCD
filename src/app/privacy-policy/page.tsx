// src/app/privacy-policy/page.tsx
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy and data protection practices for ${siteConfig.name} in compliance with the Kenya Data Protection Act.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Legal & Policy
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026
          </p>
        </div>

        <div className="space-y-8 rounded-md border border-slate-200 bg-white p-6 sm:p-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              1. Information We Collect
            </h2>
            <p>
              At <strong>{siteConfig.name}</strong>, we respect your privacy and
              are committed to safeguarding personal information collected
              through our web forms, booking modals, and direct communication
              channels:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>Contact Information:</strong> Full name,
                telephone/WhatsApp number, and email address submitted during
                test drive bookings or import inquiries.
              </li>
              <li>
                <strong>Vehicle Preferences:</strong> Target models, stock
                numbers, and financing parameters chosen through loan
                estimators.
              </li>
              <li>
                <strong>Trade-In Specifications:</strong> Details regarding your
                existing car (make, year, mileage, and registration details)
                provided for valuation purposes.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              2. How Your Data Is Utilized
            </h2>
            <p>
              We process personal data strictly for automotive transaction
              purposes in accordance with the Kenya Data Protection Act:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Scheduling showroom viewings and test drives.</li>
              <li>
                Providing customized import quotations and duty estimates.
              </li>
              <li>
                Facilitating NTSA ownership transfer documentation upon
                finalizing purchases.
              </li>
              <li>
                Direct WhatsApp and phone communications regarding your vehicle
                of interest.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              3. Data Retention & Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to
              third-party advertising brokers. Information is shared only with
              verified institutional partners strictly necessary to complete
              your purchase:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                Partner commercial banks and microfinance institutions (solely
                upon your explicit request for asset financing).
              </li>
              <li>
                Logistics and clearing agents handling port clearance in Mombasa
                for custom imports.
              </li>
              <li>
                Government agencies (NTSA, KRA) as legally required for logbook
                transfer and duty compliance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              4. Security Measures
            </h2>
            <p>
              All inquiry transmissions and administrative dashboards are
              secured using industry-standard TLS encryption, authenticated
              access controls, and protected cloud database infrastructures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold uppercase text-slate-900">
              5. Contact Us Regarding Your Data
            </h2>
            <p>
              If you wish to review, update, or request the deletion of your
              inquiry records from our system, please contact:
            </p>
            <div className="rounded bg-slate-50 p-4 border border-slate-100 font-mono text-xs text-slate-800 space-y-1">
              <div>
                <strong>Data Controller:</strong> {siteConfig.director} (
                {siteConfig.name})
              </div>
              <div>
                <strong>Email:</strong> {siteConfig.email}
              </div>
              <div>
                <strong>Location:</strong> {siteConfig.location}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
