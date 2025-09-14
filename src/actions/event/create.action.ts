"use server";
import { validate } from "@/utils/validate.util";
import { CreateEventDTO } from "@/types/event";
import { db } from "@/lib/db";
export const createEvent = async (data: CreateEventDTO) => {
  const { name, venue, timing, path, description } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[CREATE EVENT] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }
    await db.event.create({
      data: {
        name,
        venue,
        timing,
        organiserId: check.id,
        description,
      },
    });

    return { success: true, message: "Event created successfully" };
  } catch (err) {
    console.error(`[CREATE EVENT] Error creating event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
