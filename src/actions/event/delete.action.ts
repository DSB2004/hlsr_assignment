"use server";
import { validate } from "@/utils/validate.util";
import { DeleteEventDTO } from "@/types/event";
import { db } from "@/lib/db";
export const deleteEvent = async (data: DeleteEventDTO) => {
  const { id, path } = data;
  await validate({ path });
  try {
    await db.$transaction(async (prisma) => {
      await prisma.guest.deleteMany({
        where: {
          eventId: id,
        },
      });
      await prisma.event.delete({
        where: {
          id,
        },
      });
    });
    return { success: true, message: "Event deleted successfully" };
  } catch (err) {
    console.error(`[DELETE EVENT] Error deleting event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
