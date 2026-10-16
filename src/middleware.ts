// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const session = await auth();

    const role = (session.sessionClaims?.metadata as { role?: string })?.role;
    const email = session.sessionClaims?.email as string | undefined;
    const isOwner = email === "pattinnjue@gmail.com";

    // If unauthenticated or lacking admin rights: rewrite to native 404 (Stealth Mode)
    if (!session.userId || (role !== "admin" && !isOwner)) {
      const notFoundUrl = new URL("/_not-found", req.url);
      return NextResponse.rewrite(notFoundUrl, { status: 404 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
