// src/app/about/page.tsx
import { siteConfig } from "@/config/siteConfig";
import { MapPin, Phone, Mail, Award, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: `About Us | ${siteConfig.name} Nairobi`,
  description:
    "Learn about Honorable Car Dealers. Dedicated to transparent, reputable car sales and importation in Nairobi, Kenya.",
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4FD8]">
            Our Story & Values
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            About Honorable Car Dealers
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed italic">
            &quot;{siteConfig.motto}&quot;
          </p>
        </div>

        {/* Narrative */}
        <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Operating out of <strong>Nairobi, Kenya</strong>,{" "}
            <strong>Honorable Car Dealers (HCD)</strong> was founded on a
            straightforward principle: car transactions should be transparent,
            verified, and free of unpleasant surprises.
          </p>
          <p>
            Under the leadership of Director{" "}
            <strong>{siteConfig.director}</strong>, we specialize in high-grade
            foreign used imports (primarily Japan and the UK), clean locally
            used cars, direct auction importations, and structured trade-ins.
          </p>
          <p>
            Every unit on our yard undergoes rigorous mechanical verification,
            export grade cross-checking, and proper KRA customs documentation to
            guarantee your ownership peace of mind.
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Showroom Location
            </h3>
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <MapPin className="h-4 w-4 text-[#0B4FD8] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">
                  {siteConfig.location}
                </p>
                <p className="text-slate-500">
                  Showroom visits and physical viewings available Monday to
                  Saturday.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 pt-2">
              <Clock className="h-4 w-4 text-[#0B4FD8] shrink-0" />
              <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Direct Inquiries
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0B4FD8]" />
                <span>
                  {siteConfig.phone} (Director: {siteConfig.director})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#0B4FD8]" />
                <span>{siteConfig.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Dealership Commitments */}
        <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            What You Can Expect
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#0B4FD8]" />
              <span>Authentic KRA logbooks and export certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#0B4FD8]" />
              <span>Zero hidden import or clearance expenses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#0B4FD8]" />
              <span>Fair and transparent vehicle valuations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#0B4FD8]" />
              <span>Assistance with asset financing through partner banks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
