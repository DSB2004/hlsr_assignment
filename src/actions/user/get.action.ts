"use server";
import { validate } from "@/utils/validate.util";
import { db } from "@/lib/db";
interface GetUserDTO {
  path: string;
}

export const getAccount = async (data: GetUserDTO) => {
  const { path } = data;
  const { email, authId } = await validate({ path });
  try {
    const user = await db.user.findUnique({
      where: {
        authId,
      },
    });

    if (!user) {
      console.warn(`[GET ACCOUNT] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    return { success: true, message: "User account found", user };
  } catch (err) {
    console.error(`[GET ACCOUNT] Error getting user account ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
