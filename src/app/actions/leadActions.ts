// src/app/actions/leadActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { LeadType } from "@prisma/client";
import { sendLeadAlertEmail } from "@/lib/mail";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(9, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  vehicleId: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function submitTestDriveLead(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || null,
    vehicleId: (formData.get("vehicleId") as string) || null,
    date: (formData.get("date") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };

  const parsed = leadSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: "Please verify all required fields." };
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        type: LeadType.TEST_DRIVE,
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        vehicleId: parsed.data.vehicleId || null,
        message: parsed.data.notes || "Requested showroom test drive",
        metadata: {
          preferredDate: parsed.data.date || null,
        },
      },
      include: {
        vehicle: true,
      },
    });

    // Send async email notification
    await sendLeadAlertEmail({
      customerName: lead.fullName,
      phone: lead.phone,
      email: lead.email,
      vehicleTitle: lead.vehicle
        ? `${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model}`
        : undefined,
      preferredDate: parsed.data.date || undefined,
      notes: parsed.data.notes || undefined,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to save lead:", error);
    return {
      success: false,
      error:
        "Unable to submit booking. Please contact us directly via WhatsApp.",
    };
  }
}
