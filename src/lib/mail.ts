// src/lib/mail.ts
import { Resend } from "resend";
import { siteConfig } from "@/config/siteConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadEmailData {
  customerName: string;
  phone: string;
  email?: string | null;
  vehicleTitle?: string;
  preferredDate?: string;
  notes?: string;
}

export async function sendLeadAlertEmail({
  customerName,
  phone,
  email,
  vehicleTitle,
  preferredDate,
  notes,
}: LeadEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not defined. Email alert skipped.");
    return;
  }

  const targetEmail = process.env.DEALER_ALERT_EMAIL || "delivered@resend.dev";

  try {
    await resend.emails.send({
      from: "Honorable Car Dealers <onboarding@resend.dev>",
      to: [targetEmail],
      subject: `[New Lead] Test Drive Request: ${customerName} - ${vehicleTitle || "Showroom Unit"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px;">
          <div style="background-color: #0b0d10; padding: 16px; border-radius: 4px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Honorable Car Dealers</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">New Customer Inquiry Alert</p>
          </div>
          
          <div style="padding: 20px 0; font-size: 14px; color: #1e293b; line-height: 1.6;">
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}">Open in WhatsApp</a></p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
            <p><strong>Vehicle Inquired:</strong> ${vehicleTitle || "General Showroom Inventory"}</p>
            ${preferredDate ? `<p><strong>Requested Date:</strong> ${preferredDate}</p>` : ""}
            ${notes ? `<p><strong>Customer Notes:</strong> ${notes}</p>` : ""}
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 11px; color: #64748b;">
            This inquiry was submitted on <a href="${siteConfig.url}">${siteConfig.name}</a> and saved to your dealer dashboard.
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send Resend email alert:", error);
  }
}
