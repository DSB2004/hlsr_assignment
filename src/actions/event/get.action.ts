"use server";
import { validate } from "@/utils/validate.util";
import { GetEventDTO } from "@/types/event";
import { Event } from "@/types/event";
import { db } from "@/lib/db";
export const getEvent = async (data: GetEventDTO) => {
  const { id, path } = data;
  await validate({ path });
  try {
    const res = await db.event.findUnique({
      where: {
        id,
      },
    });
    if (!res) {
      console.warn(`[UPDATE EVENT] Event doesn't exist ${id}`);
      return { success: false, message: "Event doesn't exist" };
    }
    return {
      success: true,
      message: "Event found",
      event: res as unknown as Event,
    };
  } catch (err) {
    console.error(`[CREATE ACCOUNT] Error getting event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
