// src/app/actions/adminVehicleActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  VehicleCondition,
  Transmission,
  FuelType,
  Drivetrain,
  VehicleStatus,
} from "@prisma/client";

export async function createVehicle(formData: FormData) {
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const year = parseInt(formData.get("year") as string);
  const trim = (formData.get("trim") as string) || null;
  const stockNumber = formData.get("stockNumber") as string;
  const vin = (formData.get("vin") as string) || null;
  const bodyStyle = formData.get("bodyStyle") as string;
  const condition = formData.get("condition") as VehicleCondition;
  const transmission = formData.get("transmission") as Transmission;
  const fuelType = formData.get("fuelType") as FuelType;
  const drivetrain = formData.get("drivetrain") as Drivetrain;
  const engineSizeCc = formData.get("engineSizeCc")
    ? parseInt(formData.get("engineSizeCc") as string)
    : null;
  const mileageKm = parseInt(formData.get("mileageKm") as string);
  const priceKes = parseFloat(formData.get("priceKes") as string);
  const exteriorColor = formData.get("exteriorColor") as string;
  const interiorColor = (formData.get("interiorColor") as string) || null;
  const description = formData.get("description") as string;
  const rawFeatures = formData.get("features") as string;

  const coverImageUrl = (formData.get("coverImageUrl") as string)?.trim();
  const additionalImagesRaw =
    (formData.get("additionalImages") as string) || "";

  const additionalUrls = additionalImagesRaw
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter((url) => url.startsWith("http"));

  const allImages = [
    ...(coverImageUrl ? [coverImageUrl] : []),
    ...additionalUrls,
  ];

  const features = rawFeatures
    ? rawFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const slug = `${year}-${make.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${stockNumber.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  await prisma.vehicle.create({
    data: {
      slug,
      stockNumber,
      vin,
      make,
      model,
      year,
      trim,
      bodyStyle,
      condition,
      transmission,
      fuelType,
      drivetrain,
      engineSizeCc,
      mileageKm,
      priceKes,
      exteriorColor,
      interiorColor,
      description,
      features,
      status: VehicleStatus.AVAILABLE,
      images:
        allImages.length > 0
          ? {
              create: allImages.map((url, idx) => ({
                url,
                publicId: `upload_${Date.now()}_${idx}`,
                order: idx,
                isCover: idx === 0,
              })),
            }
          : undefined,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
  redirect("/admin/vehicles");
}

export async function updateVehicle(id: string, formData: FormData) {
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const year = parseInt(formData.get("year") as string);
  const trim = (formData.get("trim") as string) || null;
  const stockNumber = formData.get("stockNumber") as string;
  const vin = (formData.get("vin") as string) || null;
  const bodyStyle = formData.get("bodyStyle") as string;
  const condition = formData.get("condition") as VehicleCondition;
  const transmission = formData.get("transmission") as Transmission;
  const fuelType = formData.get("fuelType") as FuelType;
  const drivetrain = formData.get("drivetrain") as Drivetrain;
  const engineSizeCc = formData.get("engineSizeCc")
    ? parseInt(formData.get("engineSizeCc") as string)
    : null;
  const mileageKm = parseInt(formData.get("mileageKm") as string);
  const priceKes = parseFloat(formData.get("priceKes") as string);
  const previousPriceKes = formData.get("previousPriceKes")
    ? parseFloat(formData.get("previousPriceKes") as string)
    : null;
  const exteriorColor = formData.get("exteriorColor") as string;
  const interiorColor = (formData.get("interiorColor") as string) || null;
  const description = formData.get("description") as string;
  const rawFeatures = formData.get("features") as string;
  const status = formData.get("status") as VehicleStatus;

  const coverImageUrl = (formData.get("coverImageUrl") as string)?.trim();
  const additionalImagesRaw =
    (formData.get("additionalImages") as string) || "";

  const additionalUrls = additionalImagesRaw
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter((url) => url.startsWith("http"));

  const allImages = [
    ...(coverImageUrl ? [coverImageUrl] : []),
    ...additionalUrls,
  ];

  const features = rawFeatures
    ? rawFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  await prisma.vehicle.update({
    where: { id },
    data: {
      stockNumber,
      vin,
      make,
      model,
      year,
      trim,
      bodyStyle,
      condition,
      transmission,
      fuelType,
      drivetrain,
      engineSizeCc,
      mileageKm,
      priceKes,
      previousPriceKes,
      exteriorColor,
      interiorColor,
      description,
      features,
      status,
    },
  });

  if (allImages.length > 0) {
    await prisma.vehicleImage.deleteMany({
      where: { vehicleId: id },
    });

    await prisma.vehicleImage.createMany({
      data: allImages.map((url, idx) => ({
        vehicleId: id,
        url,
        publicId: `upload_${Date.now()}_${idx}`,
        order: idx,
        isCover: idx === 0,
      })),
    });
  }

  revalidatePath("/inventory");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
  redirect("/admin/vehicles");
}

export async function updateVehicleStatus(id: string, status: VehicleStatus) {
  await prisma.vehicle.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/inventory");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}

export async function deleteVehicle(id: string) {
  await prisma.vehicle.delete({
    where: { id },
  });

  revalidatePath("/inventory");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}
