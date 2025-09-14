"use server";
import { db } from "@/lib/db";
import { createJWT } from "@/utils/jwt.util";
import { TokenType } from "@/types/auth";
import { sendMail } from "@/worker/service/email.service";
interface RetryDTO {
  email: string;
  clientURL: string;
}

export const retry = async (data: RetryDTO) => {
  const { email, clientURL } = data;

  try {
    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[RETRY] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const token = await createJWT({
      payload: { email: user.email, action: TokenType.VERIFICATION },
      expireIn: 5 * 60,
    });

    const url = clientURL + "/auth/verify?auth_token=" + token;

    await sendMail({
      content: `Please continue here to verify your account ${url}\nPlease note this session only active for next 5 minute\nAvoid this mail if you haven't requested this`,
      email: user.email,
      subject: "Account Verification",
    });
    return {
      success: false,
      message: `Failed! Verification pending for ${email}`,
    };
  } catch (err) {
    console.error(`[SIGNIN] Error happened ${err}`);
    return {
      status: false,
      message: "Internal Server Error",
    };
  }
};
