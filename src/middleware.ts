import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const PUBLIC_PATHS = ["/auth", "/invite"];
const ACCOUNT_PATHS = ["/account", "/api"];
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = (await cookies()).get("access-token")?.value;
  const refreshToken = (await cookies()).get("refresh-token")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  if (ACCOUNT_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const res = await fetch(`${origin}/api/account`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)",
  ],
};
