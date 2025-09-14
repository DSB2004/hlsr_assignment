"use server";
import { validate } from "@/utils/validate.util";
import { DeleteGuestDTO } from "@/types/guest";
import { db } from "@/lib/db";
export const deleteGuest = async (data: DeleteGuestDTO) => {
  const { guestIds, path } = data;
  await validate({ path });
  try {
    await db.guest.deleteMany({
      where: {
        id: {
          in: guestIds,
        },
      },
    });
    return {
      success: true,
      message: "Selected guest deleted successfully",
      guestIds,
    };
  } catch (err) {
    console.error(`[DELETE GUEST] Error deleting guest ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
