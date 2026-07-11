import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/recovery",
  "/changePassword",
  "/not-found",
];

/* const PUBLIC_FILE = /\.(.*)$/; */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  } */

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get("auth_token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
