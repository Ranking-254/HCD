// src/components/VehicleEditForm.tsx
"use client";

import { useState } from "react";
import { updateVehicle } from "@/app/actions/adminVehicleActions";
import { ImageDropzone } from "@/components/ImageDropzone";
import type { Vehicle, VehicleImage } from "@prisma/client";

interface VehicleWithImages extends Vehicle {
  images: VehicleImage[];
}

export function VehicleEditForm({ vehicle }: { vehicle: VehicleWithImages }) {
  const [images, setImages] = useState<string[]>(
    vehicle.images.map((img) => img.url),
  );
  const [submitting, setSubmitting] = useState(false);

  const updateAction = updateVehicle.bind(null, vehicle.id);

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        await updateAction(formData);
      }}
      className="mt-6 space-y-5 text-xs"
    >
      {/* Hidden inputs transmitting images */}
      <input type="hidden" name="coverImageUrl" value={images[0] || ""} />
      <input
        type="hidden"
        name="additionalImages"
        value={images.slice(1).join("\n")}
      />

      {/* Photo Dropzone Uploader */}
      <div className="space-y-2">
        <label className="font-bold uppercase text-slate-700">
          Vehicle Photos (Drag / set cover / remove)
        </label>
        <ImageDropzone images={images} onChange={setImages} />
      </div>

      {/* Status & Featured */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
        <div>
          <label className="font-bold uppercase text-slate-700">
            Stock Status *
          </label>
          <select
            name="status"
            defaultValue={vehicle.status}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="RESERVED">RESERVED</option>
            <option value="SOLD">SOLD</option>
          </select>
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Stock Number *
          </label>
          <input
            type="text"
            name="stockNumber"
            required
            defaultValue={vehicle.stockNumber}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
      </div>

      {/* Identification */}
      <div>
        <label className="font-bold uppercase text-slate-700">
          VIN / Chassis Number
        </label>
        <input
          type="text"
          name="vin"
          defaultValue={vehicle.vin || ""}
          placeholder="e.g. TRJ150-00341"
          className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
        />
      </div>

      {/* Make / Model / Year */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="font-bold uppercase text-slate-700">Make *</label>
          <input
            type="text"
            name="make"
            required
            defaultValue={vehicle.make}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">Model *</label>
          <input
            type="text"
            name="model"
            required
            defaultValue={vehicle.model}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">Year *</label>
          <input
            type="number"
            name="year"
            required
            defaultValue={vehicle.year}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
      </div>

      {/* Trim / Body Style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="font-bold uppercase text-slate-700">
            Trim / Grade
          </label>
          <input
            type="text"
            name="trim"
            defaultValue={vehicle.trim || ""}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Body Style *
          </label>
          <select
            name="bodyStyle"
            defaultValue={vehicle.bodyStyle}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Pickup">Pickup</option>
            <option value="Coupe">Coupe</option>
            <option value="Van">Van</option>
          </select>
        </div>
      </div>

      {/* Powertrain & Condition */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="font-bold uppercase text-slate-700">
            Condition
          </label>
          <select
            name="condition"
            defaultValue={vehicle.condition}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="FOREIGN_USED">Foreign Used</option>
            <option value="LOCAL_USED">Local Used</option>
            <option value="BRAND_NEW">Brand New</option>
          </select>
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Transmission
          </label>
          <select
            name="transmission"
            defaultValue={vehicle.transmission}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="AUTOMATIC">Automatic</option>
            <option value="MANUAL">Manual</option>
            <option value="CVT">CVT</option>
            <option value="DUAL_CLUTCH">Dual Clutch</option>
          </select>
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Fuel Type
          </label>
          <select
            name="fuelType"
            defaultValue={vehicle.fuelType}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ELECTRIC">Electric</option>
          </select>
        </div>
      </div>

      {/* Drivetrain, Mileage, Engine */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="font-bold uppercase text-slate-700">
            Drivetrain
          </label>
          <select
            name="drivetrain"
            defaultValue={vehicle.drivetrain}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          >
            <option value="FOUR_WD">4WD</option>
            <option value="AWD">AWD</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
          </select>
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Mileage (KM) *
          </label>
          <input
            type="number"
            name="mileageKm"
            required
            defaultValue={vehicle.mileageKm}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Engine Size (CC)
          </label>
          <input
            type="number"
            name="engineSizeCc"
            defaultValue={vehicle.engineSizeCc || ""}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
      </div>

      {/* Pricing & Colors */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="font-bold uppercase text-slate-700">
            Current Price in KES *
          </label>
          <input
            type="number"
            name="priceKes"
            required
            defaultValue={Number(vehicle.priceKes)}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Previous Price (Strikethrough)
          </label>
          <input
            type="number"
            name="previousPriceKes"
            defaultValue={
              vehicle.previousPriceKes ? Number(vehicle.previousPriceKes) : ""
            }
            placeholder="Optional discount display"
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
        <div>
          <label className="font-bold uppercase text-slate-700">
            Exterior Color *
          </label>
          <input
            type="text"
            name="exteriorColor"
            required
            defaultValue={vehicle.exteriorColor}
            className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
          />
        </div>
      </div>

      <div>
        <label className="font-bold uppercase text-slate-700">
          Interior Color
        </label>
        <input
          type="text"
          name="interiorColor"
          defaultValue={vehicle.interiorColor || ""}
          className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
        />
      </div>

      <div>
        <label className="font-bold uppercase text-slate-700">
          Features (Comma separated)
        </label>
        <input
          type="text"
          name="features"
          defaultValue={vehicle.features.join(", ")}
          className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
        />
      </div>

      <div>
        <label className="font-bold uppercase text-slate-700">
          Description *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={vehicle.description}
          className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded bg-[#0B4FD8] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296] disabled:opacity-50"
      >
        {submitting ? "Saving Changes..." : "Save Vehicle Changes"}
      </button>
    </form>
  );
}
