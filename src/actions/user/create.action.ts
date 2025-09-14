"use server";
import { Prisma } from "@/generated/prisma";
import { validate } from "@/utils/validate.util";
import { CreateAccountDTO } from "@/types/user";
import { db } from "@/lib/db";
export const createAccount = async (data: CreateAccountDTO) => {
  const { name, path, phone } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (check) {
      console.warn(`[CREATE ACCOUNT] Account already exist ${email}`);
      return { success: false, message: "Account already exist" };
    }
    await db.user.create({
      data: {
        email,
        authId,
        name,
        phone,
      },
    });

    return { success: true, message: "User account created successfully" };
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
    console.error(`[CREATE ACCOUNT] Error creating user account ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
