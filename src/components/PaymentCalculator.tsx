// src/components/PaymentCalculator.tsx
"use client";

import { useState, useId } from "react";
import { formatPriceKes } from "@/lib/utils";
import { Calculator } from "lucide-react";

export function PaymentCalculator({ priceKes }: { priceKes: number }) {
  const downPaymentId = useId();
  const loanTermId = useId();
  const interestRateId = useId();

  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [months, setMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(14); // Standard Kenyan asset financing benchmark

  const downPaymentAmount = (priceKes * downPaymentPercent) / 100;
  const principal = priceKes - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;

  const monthlyPayment =
    monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Calculator className="h-4 w-4 text-[#0B4FD8]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Estimated Financing Calculator
        </h3>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <label htmlFor={downPaymentId}>
              Down Payment ({downPaymentPercent}%)
            </label>
            <span className="font-bold text-slate-900">
              {formatPriceKes(downPaymentAmount)}
            </span>
          </div>
          <input
            id={downPaymentId}
            type="range"
            min="10"
            max="60"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-[#0B4FD8]"
          />
        </div>

        <div>
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <label htmlFor={loanTermId}>Loan Period</label>
            <span className="font-bold text-slate-900">{months} Months</span>
          </div>
          <input
            id={loanTermId}
            type="range"
            min="12"
            max="60"
            step="6"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-[#0B4FD8]"
          />
        </div>

        <div>
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <label htmlFor={interestRateId}>Estimated Bank Interest Rate</label>
            <span className="font-bold text-slate-900">
              {interestRate}% p.a.
            </span>
          </div>
          <input
            id={interestRateId}
            type="range"
            min="10"
            max="20"
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-[#0B4FD8]"
          />
        </div>
      </div>

      <div className="rounded bg-slate-50 p-3 text-center border border-slate-100">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          Estimated Monthly Installment
        </span>
        <div className="text-xl font-black text-[#0B4FD8]">
          {formatPriceKes(monthlyPayment)}
          <span className="text-xs font-normal text-slate-500"> / mo</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-400">
          *Estimates exclude comprehensive insurance, valuation, and bank
          processing fees.
        </p>
      </div>
    </div>
  );
}
