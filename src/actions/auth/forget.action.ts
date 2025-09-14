"use server";
import { db } from "@/lib/db";
import { createJWT } from "@/utils/jwt.util";
import { TokenType } from "@/types/auth";
import { sendMail } from "@/worker/service/email.service";
interface ForgetPasswordDTO {
  email: string;
  clientURL: string;
}

export const forgetPassword = async (data: ForgetPasswordDTO) => {
  const { email, clientURL } = data;

  try {
    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[FORGET PASSWORD] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const token = await createJWT({
      payload: { email: user.email, action: TokenType.PASSWORD },
      expireIn: "5m",
    });

    const url = clientURL + "/auth/password/reset?auth_token=" + token;

    await sendMail({
      content: `Please continue here to update your password ${url}\nPlease note this session only active for next 5 minute\nAvoid this mail if you haven't request any password`,
      email: user.email,
      subject: "Password Change Request",
    });
    return {
      success: true,
      message: "Verification email has been sent",
    };
  } catch (err) {
    console.error(`[FORGET PASSWORD] Error happened ${err}`);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
