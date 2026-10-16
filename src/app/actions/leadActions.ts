// src/app/actions/leadActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { LeadStatus, LeadType } from "@prisma/client";
import { sendLeadAlertEmail } from "@/lib/mail";
import { requireAdmin } from "@/lib/authGuard";
// Inside src/app/actions/leadActions.ts
export interface TestDriveInput {
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  notes?: string;
  vehicleId?: string;
  companyWebsite?: string;
}

export async function submitTestDriveLead(input: FormData | TestDriveInput) {
  try {
    let fullName = "";
    let phone = "";
    let email: string | undefined;
    let preferredDate: string | undefined;
    let notes: string | undefined;
    let vehicleId: string | undefined;
    let honeypot: string | undefined;

    if (input instanceof FormData) {
      honeypot = (input.get("companyWebsite") as string) || undefined;
      fullName = (input.get("fullName") as string) || "";
      phone = (input.get("phone") as string) || "";
      email = (input.get("email") as string) || undefined;
      preferredDate = (input.get("preferredDate") as string) || undefined;
      notes = (input.get("notes") as string) || undefined;
      vehicleId = (input.get("vehicleId") as string) || undefined;
    } else {
      honeypot = input.companyWebsite;
      fullName = input.fullName;
      phone = input.phone;
      email = input.email;
      preferredDate = input.preferredDate;
      notes = input.notes;
      vehicleId = input.vehicleId;
    }

    // HONEYPOT TRAP: If a bot filled the hidden input, pretend success and exit silently
    if (honeypot && honeypot.trim().length > 0) {
      console.warn("Spam bot submission blocked by honeypot field.");
      return { success: true, leadId: "discarded-spam" };
    }

    if (!fullName || !phone) {
      return { success: false, error: "Name and phone number are required." };
    }

    const lead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        message:
          notes || (preferredDate ? `Preferred Date: ${preferredDate}` : null),
        type: LeadType.TEST_DRIVE,
        status: LeadStatus.NEW,
        vehicleId: vehicleId || null,
      },
      include: {
        vehicle: true,
      },
    });

    // Send email alert via Resend
    try {
      await sendLeadAlertEmail({
        customerName: lead.fullName,
        customerEmail: lead.email || undefined,
        inquiryType: "TEST_DRIVE",
        vehicleDetails: lead.vehicle
          ? `${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model} (${lead.vehicle.stockNumber})`
          : "General Test Drive Inquiry",
        message: [
          `Phone: ${lead.phone}`,
          preferredDate ? `Preferred Date: ${preferredDate}` : null,
          notes ? `Notes: ${notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      } as any);
    } catch (mailError) {
      console.error("Failed to send Resend email alert:", mailError);
    }

    revalidatePath("/admin/leads");
    revalidatePath("/admin");

    return { success: true, leadId: lead.id };
  } catch (error: any) {
    console.error("Failed to submit test drive lead:", error);
    return {
      success: false,
      error: error?.message || "Failed to submit booking",
    };
  }
}

// RESTRICTED: Changing lead workflow status requires dealership admin privileges
export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin();

  await prisma.lead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

// RESTRICTED: Deleting leads requires dealership admin privileges
export async function deleteLead(id: string) {
  await requireAdmin();

  await prisma.lead.delete({
    where: { id },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
