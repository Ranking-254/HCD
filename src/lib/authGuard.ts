// src/lib/authGuard.ts
import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Sign in required.");
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const email = sessionClaims?.email as string | undefined;
  const isOwner = email === "pattinnjue@gmail.com";

  if (role !== "admin" && !isOwner) {
    throw new Error("Forbidden: Dealership administrator privileges required.");
  }

  return { userId };
}
