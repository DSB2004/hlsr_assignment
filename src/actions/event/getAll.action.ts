"use server";

import { validate } from "@/utils/validate.util";
import { GetAllEventDTO } from "@/types/event";
import { db } from "@/lib/db";

export const getEvents = async (data: GetAllEventDTO) => {
  const { search, page = 1, path, limit = 10 } = data;
  const { authId, email } = await validate({ path });
  try {
    const user = await db.user.findUnique({
      where: { authId },
    });

    if (!user) {
      console.warn(`[GET ALL EVENTS] No account found for ${email}`);
      return { success: false, message: "Account does not exist" };
    }

    const whereClause = {
      organiserId: user.id,
      ...(search
        ? {
            name: {
              mode: "insensitive",
              contains: search,
            },
          }
        : {}),
    };

    const total = await db.event.count({
      // @ts-ignore
      where: whereClause,
    });

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const events = await db.event.findMany({
      // @ts-ignore
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      message: "Events fetched successfully",
      data: events,
      total,
      page,
      limit,
      totalPages,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
    };
  } catch (err) {
    console.error(`[GET EVENTS] Error getting events: ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
