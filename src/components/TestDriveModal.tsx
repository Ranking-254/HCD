// src/components/TestDriveModal.tsx
"use client";

import { useState } from "react";
import { submitTestDriveLead } from "@/app/actions/leadActions";
import { Calendar, X, CheckCircle } from "lucide-react";

export function TestDriveModal({
  vehicleId,
  vehicleTitle,
}: {
  vehicleId: string;
  vehicleTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("vehicleId", vehicleId);

    const res = await submitTestDriveLead(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "Submission failed.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-700 bg-[#12161C] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800"
      >
        <Calendar className="h-4 w-4" />
        <span>Book a Test Drive</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-md bg-white p-6 shadow-xl">
            <button
              onClick={() => {
                setIsOpen(false);
                setSubmitted(false);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle className="mx-auto h-12 w-12 text-[#0B4FD8]" />
                <h3 className="text-base font-bold text-slate-900 uppercase">
                  Booking Received
                </h3>
                <p className="text-xs text-slate-500">
                  Our team will contact you shortly to confirm your scheduled
                  appointment for the {vehicleTitle}.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 rounded bg-[#0B4FD8] px-4 py-2 text-xs font-bold text-white uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-900">
                    Schedule Test Drive
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {vehicleTitle}
                  </p>
                </div>

                {errorMsg && (
                  <div className="rounded bg-red-50 p-2 text-xs text-red-600">
                    {errorMsg}
                  </div>
                )}

                {/* Honeypot Spam Trap: Hidden from users, filled by bots */}
                <div
                  className="opacity-0 absolute -left-[9999px] h-0 w-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <label htmlFor="companyWebsite">Leave empty</label>
                  <input
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. John Kamau"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs outline-none focus:border-[#0B4FD8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-700">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 0712 345 678"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs outline-none focus:border-[#0B4FD8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs outline-none focus:border-[#0B4FD8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-700">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="preferredDate"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs outline-none focus:border-[#0B4FD8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-[#0B4FD8] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Confirm Booking Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
