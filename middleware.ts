import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  getPreferredLocaleFromHeader,
  isValidLocale,
  locales,
} from "@/i18n";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathnameHasLocale(pathname)) {
    const locale = pathname.split("/")[1];

    if (!isValidLocale(locale)) {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    return NextResponse.next();
  }

  const locale = getPreferredLocaleFromHeader(request.headers.get("accept-language"));
  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
