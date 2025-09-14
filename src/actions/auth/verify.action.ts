"use server";
import { db } from "@/lib/db";
import { createJWT, verifyJWT } from "@/utils/jwt.util";
import { TokenType } from "@/types/auth";
import { setCookies } from "@/utils/cookies.util";
interface VerificationDTO {
  token: string;
}

export const verification = async (data: VerificationDTO) => {
  const { token } = data;

  try {
    const res = await verifyJWT<{ email: string; action: TokenType }>(token);

    if (res == null) {
      console.log("failed to verify");
      return {
        status: false,
        message: "Failed! Unable to change password, Session Expired",
      };
    }
    const { email, action } = res;

    if (action !== TokenType.VERIFICATION) {
      return {
        status: false,
        message: "Failed! Wrong verification token provided",
      };
    }

    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[VERIFICATION] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }
    await db.auth.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });
    const _accessToken = await createJWT({
      payload: {
        authId: user.id.toString(),
        email: user.email,
        action: TokenType.ACCESS,
      },
      expireIn: 15 * 60,
    });

    const _refreshToken = await createJWT({
      payload: {
        authId: user.id.toString(),
        email: user.email,
        action: TokenType.REFRESH,
      },
      expireIn: "7d",
    });

    await setCookies({
      _accessToken,
      _refreshToken,
    });

    return {
      success: true,
      message: `Verification successful for account ${email}`,
    };
  } catch (err) {
    console.error(`[VERIFICATION] Error happened ${err}`);
    return {
      status: false,
      message: "Internal Server Error",
    };
  }
};
