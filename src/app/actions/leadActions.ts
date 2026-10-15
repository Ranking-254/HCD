// src/app/actions/leadActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { LeadStatus, LeadType } from "@prisma/client";
import { sendLeadAlertEmail } from "@/lib/mail";

interface TestDriveInput {
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  notes?: string;
  vehicleId?: string;
}

export async function submitTestDriveLead(data: TestDriveInput) {
  try {
    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        message:
          data.notes ||
          (data.preferredDate ? `Preferred Date: ${data.preferredDate}` : null),
        type: LeadType.TEST_DRIVE,
        status: LeadStatus.NEW,
        vehicleId: data.vehicleId || null,
      },
      include: {
        vehicle: true,
      },
    });

    // Send email alert via Resend using sendLeadAlertEmail
    try {
      await sendLeadAlertEmail({
        customerName: lead.fullName,
        customerPhone: lead.phone,
        customerEmail: lead.email || undefined,
        inquiryType: "TEST_DRIVE",
        vehicleDetails: lead.vehicle
          ? `${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model} (${lead.vehicle.stockNumber})`
          : "General Test Drive Inquiry",
        message:
          data.notes ||
          (data.preferredDate
            ? `Preferred Date: ${data.preferredDate}`
            : undefined),
      });
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

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await prisma.lead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({
    where: { id },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
