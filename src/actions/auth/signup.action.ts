"use server";
import { db } from "@/lib/db";
import { createJWT } from "@/utils/jwt.util";
import { TokenType } from "@/types/auth";
import { sendMail } from "@/worker/service/email.service";
import { hashPassword } from "@/utils/hash.util";
interface SignUpDTO {
  email: string;
  password: string;
  clientURL: string;
}

export const signUp = async (data: SignUpDTO) => {
  const { email, password, clientURL } = data;

  try {
    const user = await db.auth.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      console.warn(`[SIGNUP] User ${email} not found`);
      return {
        success: false,
        message: `Failed! Account found with email ${email}`,
      };
    }
    const hashPass = await hashPassword(password);
    await db.auth.create({
      data: {
        email,
        password: hashPass,
      },
    });

    const token = await createJWT({
      payload: { email: email, action: TokenType.VERIFICATION },
      expireIn: "5m",
    });

    const url = clientURL + "/auth/verify?auth_token=" + token;

    await sendMail({
      content: `Please continue here to verify your account ${url}\nPlease note this session only active for next 5 minute\nAvoid this mail if you haven't requested this`,
      email: email,
      subject: "Account Verification",
    });
    return {
      success: false,
      message:
        "Verification email has been sent to your authorized email. Please note this session only active for next 5 minute",
    };
  } catch (err) {
    console.error(`[SIGNUP] Error happened ${err}`);
    return {
      status: false,
      message: "Internal Server Error",
    };
  }
};
