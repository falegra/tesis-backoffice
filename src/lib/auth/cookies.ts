import { NextResponse } from "next/server";

const IS_PROD = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  res.cookies.set("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 15,
  });
  res.cookies.set("refresh_token", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.set("access_token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
  res.cookies.set("refresh_token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
}
