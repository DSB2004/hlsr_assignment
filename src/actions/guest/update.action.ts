"use server";
import { Prisma } from "@/generated/prisma";
import { validate } from "@/utils/validate.util";
import { db } from "@/lib/db";
import { UpdateGuestDTO } from "@/types/guest";
export const updateGuest = async (data: UpdateGuestDTO) => {
  const { name, phone, email: guestEmail, eventId, path, id, rsvp } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[UPDATE GUEST] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }
    await db.guest.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        email: guestEmail,
        eventId,
        rsvp,
      },
    });

    return {
      success: true,
      message: "Guest updated successfully",
      id: data.id,
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = (err.meta?.target as string[])?.join(", ") || "field";
        console.warn(`[UPDATE GUEST] Duplicate entry for ${target}`);
        return {
          success: false,
          message: `Email already in use`,
        };
      }
    }
    console.error(`[UPDATE GUEST] Error creating guest ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
