"use server";

import { validate } from "@/utils/validate.util";
import { GetAllGuestDTO } from "@/types/guest";
import { db } from "@/lib/db";

export const getGuests = async (data: GetAllGuestDTO) => {
  const { search, page = 1, path, limit = 10, eventId } = data;
  const { authId, email } = await validate({ path });
  try {
    const user = await db.user.findUnique({
      where: { authId },
    });

    if (!user) {
      console.warn(`[GET GUESTS] No account found for ${email}`);
      return { success: false, message: "Account does not exist" };
    }

    const whereClause = {
      eventId,
      ...(search
        ? {
            name: {
              mode: "insensitive",
              contains: search,
            },
          }
        : {}),
    };

    const total = await db.guest.count({
      // @ts-ignore
      where: whereClause,
    });

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const guests = await db.guest.findMany({
      // @ts-ignore
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      message: "Guest fetched successfully",
      data: guests,
      total,
      page,
      limit,
      totalPages,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
    };
  } catch (err) {
    console.error(`[GET GUESTS] Error getting events: ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
