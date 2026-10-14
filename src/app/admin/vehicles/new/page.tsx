// src/app/admin/vehicles/new/page.tsx
"use client";

import { useState } from "react";
import { createVehicle } from "@/app/actions/adminVehicleActions";
import { ImageDropzone } from "@/components/ImageDropzone";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewVehiclePage() {
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0B4FD8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to vehicles</span>
        </Link>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-lg font-black uppercase text-slate-900 border-b border-slate-100 pb-3">
          Add New Stock Unit
        </h1>

        <form
          action={async (formData) => {
            setSubmitting(true);
            await createVehicle(formData);
          }}
          className="mt-6 space-y-5 text-xs"
        >
          {/* Hidden inputs transmitting the uploaded Cloudinary URLs */}
          <input type="hidden" name="coverImageUrl" value={images[0] || ""} />
          <input
            type="hidden"
            name="additionalImages"
            value={images.slice(1).join("\n")}
          />

          {/* Photo Dropzone Uploader */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-slate-700">
              Vehicle Photos (First photo will be the main cover) *
            </label>
            <ImageDropzone images={images} onChange={setImages} />
            {images.length === 0 && (
              <p className="text-[11px] text-amber-600 font-medium">
                * Please upload at least one cover photo for the vehicle
                listing.
              </p>
            )}
          </div>

          {/* Identification */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
            <div>
              <label className="font-bold uppercase text-slate-700">
                Stock Number *
              </label>
              <input
                type="text"
                name="stockNumber"
                required
                placeholder="e.g. HCD-1005"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
            <div>
              <label className="font-bold uppercase text-slate-700">
                VIN / Chassis Number
              </label>
              <input
                type="text"
                name="vin"
                placeholder="e.g. TRJ150-00341"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
          </div>

          {/* Make / Model / Year */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="font-bold uppercase text-slate-700">
                Make *
              </label>
              <input
                type="text"
                name="make"
                required
                placeholder="e.g. Toyota"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
            <div>
              <label className="font-bold uppercase text-slate-700">
                Model *
              </label>
              <input
                type="text"
                name="model"
                required
                placeholder="e.g. Harrier"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
            <div>
              <label className="font-bold uppercase text-slate-700">
                Year *
              </label>
              <input
                type="number"
                name="year"
                required
                defaultValue={2020}
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
                placeholder="e.g. Progress Leather Package"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
            <div>
              <label className="font-bold uppercase text-slate-700">
                Body Style *
              </label>
              <select
                name="bodyStyle"
                required
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
                placeholder="e.g. 45000"
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
                placeholder="e.g. 2000"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
          </div>

          {/* Pricing & Colors */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="font-bold uppercase text-slate-700">
                Price in KES *
              </label>
              <input
                type="number"
                name="priceKes"
                required
                placeholder="e.g. 4200000"
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
                placeholder="e.g. Pearl White"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
            <div>
              <label className="font-bold uppercase text-slate-700">
                Interior Color
              </label>
              <input
                type="text"
                name="interiorColor"
                placeholder="e.g. Black Leather"
                className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold uppercase text-slate-700">
              Features (Comma separated)
            </label>
            <input
              type="text"
              name="features"
              placeholder="Sunroof, Leather Seats, 360 Camera, Keyless Go"
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
              placeholder="Auction grade details, condition notes, import history..."
              className="mt-1 w-full rounded border border-slate-200 p-2.5 outline-none focus:border-[#0B4FD8]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || images.length === 0}
            className="w-full rounded bg-[#0B4FD8] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003296] disabled:opacity-50"
          >
            {submitting
              ? "Publishing Vehicle Listing..."
              : "Publish Vehicle Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
