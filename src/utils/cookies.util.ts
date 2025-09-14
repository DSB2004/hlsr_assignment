import { cookies } from "next/headers";

export const setCookies = async ({
  _accessToken,
  _refreshToken,
}: {
  _accessToken: string;
  _refreshToken: string;
}) => {
  const cookieStore = await cookies();

  cookieStore.set("access-token", _accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60,
    priority: "high",
  });

  cookieStore.set("refresh-token", _refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    priority: "high",
  });
};
