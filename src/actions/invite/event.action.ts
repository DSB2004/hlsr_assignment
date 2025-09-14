"use server";

import {} from "@/types/event";
import { db } from "@/lib/db";
import { GetGuestEventDTO, GuestRSVPToken } from "@/types/invite";
import { verifyJWT } from "@/utils/jwt.util";
export const getGuestEvent = async (data: GetGuestEventDTO) => {
  const { token } = data;

  try {
    const res = await verifyJWT<GuestRSVPToken>(token);
    if (!res || res === null) {
      console.warn(`[GUEST EVENT] Session has expired`);
      return {
        success: false,
        message: "This invite has expired please request a new one",
      };
    }

    const { event, guest } = res;
    const details = await db.event.findUnique({
      where: {
        id: event.id,
      },
    });
    if (!details) {
      console.warn(`[GUEST EVENT] Event doesn't exist ${event.id}`);
      return {
        success: false,
        message: "This event has been removed or doesn't exist",
      };
    }

    const check = await db.guest.findMany({
      where: {
        eventId: event.id,
        id: guest.id,
      },
    });

    if (!check) {
      console.warn(`[GUEST EVENT] User not in guest list`);
      return {
        success: false,
        message:
          "You are not in guest list. Please contact the event organiser for more info",
      };
    }

    return {
      success: true,
      message: "Continue with replying with event invite",
      event: details,
    };
  } catch (err) {
    console.error(`[GUEST EVENT] Error getting event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
