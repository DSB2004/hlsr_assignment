"use server";

import { createJWT } from "@/utils/jwt.util";
import { comparePassword } from "@/utils/hash.util";
import { TokenType } from "@/types/auth";
import { sendMail } from "@/worker/service/email.service";
import { setCookies } from "@/utils/cookies.util";
import { db } from "@/lib/db";
interface SignInDTO {
  email: string;
  password: string;
  clientURL: string;
}

export const signIn = async (data: SignInDTO) => {
  const { email, password, clientURL } = data;

  try {
    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[SIGNIN] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const compare = await comparePassword(password, user.password);

    if (!compare) {
      console.warn(`[SIGNIN] Incorrect credentials ${email}`);
      return {
        success: false,
        message: `Failed! Wrong credentials for ${email}`,
      };
    }

    if (!user.isVerified) {
      console.warn(`[SIGNIN] Verification required ${email}`);
      const token = await createJWT({
        payload: { email: user.email, action: TokenType.VERIFICATION },
        expireIn: "5m",
      });

      const url = clientURL + "/auth/verify?auth_token=" + token;

      await sendMail({
        content: `Please continue here to verify your account ${url}\nPlease note this session only active for next 5 minute\nAvoid this mail if you haven't requested this`,
        email: user.email,
        subject: "Account Verification",
      });

      return {
        redirect: true,
        success: false,
        message: `Failed! Verification pending for ${email}`,
      };
    }
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
      message: "Login successful",
    };
  } catch (err) {
    console.error(`[SIGNIN] Error happened ${err}`);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
