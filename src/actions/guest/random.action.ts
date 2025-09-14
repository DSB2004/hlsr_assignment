"use server";
import { GuestRSVP, Prisma } from "@/generated/prisma";
import { validate } from "@/utils/validate.util";
import { db } from "@/lib/db";
import { CreateRandomGuestDTO, RandomGuestResponseType } from "@/types/guest";
import axios from "axios";
export const createRandomGuest = async (data: CreateRandomGuestDTO) => {
  const { path, eventId } = data;
  const { email, authId } = await validate({ path });
  try {
    const check = await db.user.findUnique({
      where: {
        authId,
      },
    });
    if (!check) {
      console.warn(`[CREATE RANDOM GUEST] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    const res = await axios.get("https://randomuser.me/api/");
    const data = res.data as RandomGuestResponseType;
    const user = data.results[0];
    await db.guest.create({
      data: {
        name: user.name.first + " " + user.name.last,
        phone: user.phone,
        email: user.email,
        eventId,
        rsvp: GuestRSVP.MAYBE,
      },
    });

    return { success: true, message: "Random Guest created successfully" };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = (err.meta?.target as string[])?.join(", ") || "field";
        console.warn(`[CREATE RANDOM GUEST] Duplicate entry for ${target}`);
        return {
          success: false,
          message: `Guest with this email already exists`,
        };
      }
    }
    console.error(`[CREATE RANDOM GUEST] Error creating guest ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
