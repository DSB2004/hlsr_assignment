"use server";
import { createJWT, verifyJWT } from "@/utils/jwt.util";
import { DecodedToken, TokenType } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookies } from "./cookies.util";
interface ValidateDTO {
  path: string;
}

const _generate = async (refreshToken: string, path: string) => {
  const refresh = await verifyJWT<DecodedToken>(refreshToken);
  if (refresh == null) {
    redirect(`/auth/login?redirect=${path}`);
  }
  const { email, authId } = refresh;
  const _accessToken = await createJWT({
    payload: {
      authId,
      email,
      action: TokenType.ACCESS,
    },
    expireIn: "15m",
  });

  const _refreshToken = await createJWT({
    payload: {
      authId,
      email,
      action: TokenType.REFRESH,
    },
    expireIn: "7d",
  });

  await setCookies({
    _accessToken,
    _refreshToken,
  });

  return { email, authId };
};

export const validate = async (data: ValidateDTO): Promise<DecodedToken> => {
  const accessToken = (await cookies()).get("access-token")?.value;
  const refreshToken = (await cookies()).get("refresh-token")?.value;

  if (!refreshToken) {
    redirect(`/auth/login?redirect=${data.path}`);
  }

  if (!accessToken) {
    return _generate(refreshToken, data.path);
  }

  const res = await verifyJWT<DecodedToken>(accessToken);
  if (res != null) {
    return res;
  }
  return _generate(refreshToken, data.path);
};
