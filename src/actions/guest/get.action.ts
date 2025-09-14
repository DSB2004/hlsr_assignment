"use server";
import { validate } from "@/utils/validate.util";
import { GetGuestDTO } from "@/types/guest";
import { db } from "@/lib/db";
import { Guest } from "@/generated/prisma";
export const getGuest = async (data: GetGuestDTO) => {
  const { id, path } = data;
  await validate({ path });
  try {
    const res = await db.guest.findUnique({
      where: {
        id,
      },
    });
    if (!res) {
      console.warn(`[GET GUEST] Guest doesn't exist ${id}`);
      return { success: false, message: "Guest doesn't exist" };
    }
    return {
      success: true,
      message: "Guest found",
      guest: res as unknown as Guest,
    };
  } catch (err) {
    console.error(`[GEST GUEST] Error getting event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
