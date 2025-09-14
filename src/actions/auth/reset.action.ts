"use server";
import { db } from "@/lib/db";
import { verifyJWT } from "@/utils/jwt.util";
import { hashPassword } from "@/utils/hash.util";
import { TokenType } from "@/types/auth";
interface ResetPasswordDTO {
  token: string;
  password: string;
}

export const resetPassword = async (data: ResetPasswordDTO) => {
  const { token, password } = data;

  try {
    const res = await verifyJWT<{ email: string; action: TokenType }>(token);

    if (res == null) {
      return {
        success: false,
        message: "Failed! Unable to change password, Session Expired",
      };
    }
    const { email, action } = res;

    if (action !== TokenType.PASSWORD) {
      return {
        success: false,
        message: "Failed! Wrong verification token provided",
      };
    }

    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.warn(`[RESET PASSWORD] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const hashPw = await hashPassword(password);

    await db.auth.update({
      where: {
        email,
      },
      data: {
        password: hashPw,
      },
    });

    return {
      success: true,
      message: "Password has been changed successfully",
    };
  } catch (err) {
    console.error(`[RES PASSWORD] Error happened ${err}`);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
