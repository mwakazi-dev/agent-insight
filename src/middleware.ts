import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const adminRoutes = ["/admin", "/admin/dashboard"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const nextCookies = cookies();
  const sessionCookie = nextCookies.get("session")?.value;
  const role = nextCookies.get("role")?.value;
  const isAdminRoute = adminRoutes.includes(path);

  if (path === "/login") {
    if (sessionCookie) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
      } else {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }

  // Bypass the middleware for the login route
  if (path === "/login") {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/" && role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAdminRoute && role === "admin") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
