// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { PublicShell } from "@/components/PublicShell";
import { siteConfig } from "@/config/siteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Quality Pre-Owned & Import Cars`,
  description: `${siteConfig.motto} Find inspected, ready-to-drive pre-owned and direct import vehicles in Nairobi, Kenya.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} min-h-screen w-full overflow-x-hidden flex flex-col bg-[#F8FAFC]`}
        >
          <PublicShell>{children}</PublicShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
