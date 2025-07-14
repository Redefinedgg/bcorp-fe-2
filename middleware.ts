import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

const secret = process.env.JWT_SECRET || "";

const supportedLocales = ["en", "lv", "ru"];
const defaultLocale = String(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en");

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const locale = supportedLocales.find((loc) => pathname.startsWith(`/${loc}`)) || defaultLocale;

  if (pathname.startsWith(`/${locale}/dashboard`) || pathname === "/dashboard") {
    const token = req.cookies.get("authToken");

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/logout`, req.url));
    }

    try {
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));

      if (!payload.emailVerified) {
        return NextResponse.redirect(new URL(`/${locale}/email-not-verified`, req.url));
      }
    } catch (err) {
      console.error("Invalid JWT:", err);
      return NextResponse.redirect(new URL(`/${locale}/logout`, req.url));
    }
  }

  return createMiddleware({
    locales: supportedLocales,
    defaultLocale,
  })(req);
}

export const config = {
  matcher: ["/", "/(lv|ru|en)/:path*"],
};
