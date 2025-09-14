"use server";
import { GuestRSVPToken, SendAllInviteDTO } from "@/types/invite";
import { sendMail } from "@/worker/service/email.service";
import { createJWT } from "@/utils/jwt.util";
import { validate } from "@/utils/validate.util";
import { db } from "@/lib/db";

export const sendAllInvite = async (data: SendAllInviteDTO) => {
  const { eventId, path, redirectURL } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[SEND INVITE] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    const event = await db.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      console.warn(`[SEND INVITE] Event doesn't exist`);
      return { success: false, message: "Event doesn't exist" };
    }

    const guests = await db.guest.findMany({
      where: {
        eventId: event.id,
      },
    });
    for (let guest of guests) {
      const token = await createJWT({
        payload: {
          guest,
          event,
        } as GuestRSVPToken,
        expireIn: "1d",
      });

      const url = redirectURL + `?invite_token=${token}`;

      await sendMail({
        email: guest.email,
        subject: `RSVP for ${event.name}`,
        content: `
      Hello ${guest.name},
      
      You have been invited to the event "${event.name}"!
      
      Please confirm your attendance by clicking the link below:
      
      ${url}
      
      This link is valid for 24 hours. If you have any questions, feel free to reach out.
      
      Looking forward to seeing you at the event!
      
      Best regards,
      The ${event.name} Team
            `,
      });
    }

    return { success: true, message: "Guest invite sent successfully" };
  } catch (err) {
    console.error(`[SEND INVITE] Error sending invite ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
