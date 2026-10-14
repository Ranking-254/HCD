// src/components/InventoryFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RotateCcw } from "lucide-react";

interface FilterProps {
  makes: string[];
  bodyStyles: string[];
}

export function InventoryFilters({ makes, bodyStyles }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleFilterChange = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`/inventory?${query}`);
  };

  const handleReset = () => {
    router.push("/inventory");
  };

  return (
    <aside className="w-full rounded-md border border-slate-200 bg-white p-5 lg:w-64 shrink-0 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Filter Vehicles
        </h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#0B4FD8]"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter by Make */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-700">
          Make
        </label>
        <select
          value={searchParams.get("make") || ""}
          onChange={(e) => handleFilterChange("make", e.target.value)}
          aria-label="Filter by Make"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B4FD8]"
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Body Style */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-700">
          Body Style
        </label>
        <select
          value={searchParams.get("bodyStyle") || ""}
          onChange={(e) => handleFilterChange("bodyStyle", e.target.value)}
          aria-label="Filter by Body Style"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B4FD8]"
        >
          <option value="">All Body Styles</option>
          {bodyStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Transmission */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-700">
          Transmission
        </label>
        <select
          value={searchParams.get("transmission") || ""}
          onChange={(e) => handleFilterChange("transmission", e.target.value)}
          aria-label="Filter by Transmission"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B4FD8]"
        >
          <option value="">All Transmissions</option>
          <option value="AUTOMATIC">Automatic</option>
          <option value="MANUAL">Manual</option>
          <option value="CVT">CVT</option>
          <option value="DUAL_CLUTCH">Dual Clutch</option>
        </select>
      </div>

      {/* Filter by Fuel Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-700">
          Fuel Type
        </label>
        <select
          value={searchParams.get("fuelType") || ""}
          onChange={(e) => handleFilterChange("fuelType", e.target.value)}
          aria-label="Filter by Fuel Type"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B4FD8]"
        >
          <option value="">All Fuel Types</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ELECTRIC">Electric</option>
        </select>
      </div>

      {/* Filter by Condition */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-700">
          Condition
        </label>
        <select
          value={searchParams.get("condition") || ""}
          onChange={(e) => handleFilterChange("condition", e.target.value)}
          aria-label="Filter by Condition"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B4FD8]"
        >
          <option value="">All Conditions</option>
          <option value="FOREIGN_USED">Foreign Used</option>
          <option value="LOCAL_USED">Local Used</option>
          <option value="BRAND_NEW">Brand New</option>
        </select>
      </div>
    </aside>
  );
}
