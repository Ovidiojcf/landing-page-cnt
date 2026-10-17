import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { NextProxy, ProxyConfig } from "next/server";
import { defaultLocale, isValidLocale, locales, type Locale } from "./get-dictionary";

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const languages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [code, qualityValue] = entry.trim().split(";q=");
      return {
        code: code.toLowerCase(),
        quality: qualityValue ? Number.parseFloat(qualityValue) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (code.startsWith("pt")) return "pt-br";
    if (code.startsWith("en")) return "en-us";
  }

  return defaultLocale;
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export const proxy: NextProxy = (request) => {
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

  const locale = getPreferredLocale(request);
  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(localizedUrl);
};

export const config: ProxyConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
