"use server";
import { Prisma } from "@/generated/prisma";
import { validate } from "@/utils/validate.util";
import { UpdateAccountDTO } from "@/types/user";
import { db } from "@/lib/db";
export const updateAccount = async (data: UpdateAccountDTO) => {
  const { name, path, phone } = data;
  const { email, authId } = await validate({ path });
  try {
    const user = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!user) {
      console.warn(`[UPDATE ACCOUNT] Account doesn't exist ${email}`);
      return { sucess: false, message: "Account doesn't exist" };
    }

    await db.user.update({
      where: {
        authId,
      },
      data: {
        name: name,
        phone: phone,
      },
    });

    return { success: true, message: "User account updated successfully" };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = (err.meta?.target as string[])?.join(", ") || "field";
        console.warn(`[CREATE ACCOUNT] Duplicate entry for ${target}`);
        return {
          success: false,
          message: `Account with this ${target} already exists`,
        };
      }
    }
    console.error(`[UPDATE ACCOUNT] Error updating user account ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
