import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";

export const config = {
  matcher: [
    "/login",
    "/services/:path*",
    "/projects/:path*",
    "/portfolio/:path*",
    "/company-info/:path*",
    "/team/:path*",
    "/legal/:path*",
    "/contacts/:path*",
    "/change-password/:path*",
  ],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const authenticated = checkAuth(accessToken, refreshToken);

  if (pathname === "/login") {
    return authenticated ? redirectTo(req, "/services") : NextResponse.next();
  }

  return authenticated ? NextResponse.next() : redirectToLogin(req);
}

function checkAuth(accessToken?: string, refreshToken?: string): boolean {
  if (accessToken) {
    try {
      const payload = decodeJwt(accessToken);
      const exp = payload.exp as number | undefined;
      if (exp && exp * 1000 > Date.now()) return true;
    } catch {
      // malformed token — fall through
    }
  }
  return !!refreshToken;
}

function redirectTo(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  const res = NextResponse.redirect(url);
  res.cookies.set("access_token", "", { maxAge: 0, path: "/" });
  res.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });
  return res;
}
