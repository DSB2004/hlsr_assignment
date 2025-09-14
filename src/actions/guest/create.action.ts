"use server";
import { Prisma } from "@/generated/prisma";
import { validate } from "@/utils/validate.util";
import { db } from "@/lib/db";
import { CreateGuestDTO } from "@/types/guest";
export const createGuest = async (data: CreateGuestDTO) => {
  const { name, phone, email: guestEmail, eventId, path } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[CREATE GUEST] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }
    await db.guest.create({
      data: {
        name,
        phone,
        email: guestEmail,
        eventId,
      },
    });

    return { success: true, message: "Guest created successfully" };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = (err.meta?.target as string[])?.join(", ") || "field";
        console.warn(`[CREATE GUEST] Duplicate entry for ${target}`);
        return {
          success: false,
          message: `Guest with this email already exists`,
        };
      }
    }
    console.error(`[CREATE GUEST] Error creating guest ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
