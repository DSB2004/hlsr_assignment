"use server";
import { validate } from "@/utils/validate.util";
import { UpdateEventDTO } from "@/types/event";
import { db } from "@/lib/db";
export const updateEvent = async (data: UpdateEventDTO) => {
  const { name, venue, timing, path, description, id } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[UPDATE EVENT] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    const event = await db.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      console.warn(`[UPDATE EVENT] Event doesn't exist ${email}`);
      return { success: false, message: "Event doesn't exist" };
    }
    await db.event.update({
      where: {
        id: id,
      },
      data: {
        name,
        venue,
        timing,
        description,
      },
    });

    return {
      success: true,
      message: "Event updated successfully",
      id: data.id,
    };
  } catch (err) {
    console.error(`[UPDATE EVENT] Error updated event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
