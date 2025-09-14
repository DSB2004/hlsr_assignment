"use server";

import { db } from "@/lib/db";
import { GuestRSVPToken, InviteReplyDTO } from "@/types/invite";
import { verifyJWT } from "@/utils/jwt.util";
export const replyInvite = async (data: InviteReplyDTO) => {
  const { token, reply } = data;

  try {
    const res = await verifyJWT<GuestRSVPToken>(token);
    if (!res || res === null) {
      console.warn(`[GUEST REPLY] Session has expired`);
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
      console.warn(`[GUEST REPLY] Event doesn't exist ${event.id}`);
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
      console.warn(`[GUEST REPLY] User not in guest list`);
      return {
        success: false,
        message:
          "You are not in guest list. Please contact the event organiser for more info",
      };
    }
    await db.guest.update({
      where: {
        id: guest.id,
        eventId: event.id,
      },
      data: {
        rsvp: reply,
      },
    });
    return {
      success: true,
      message: "Your reply has been recorded",
      event: details,
    };
  } catch (err) {
    console.error(`[GUEST REPLY] Error getting event ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
