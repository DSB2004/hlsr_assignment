"use server";

import { redis } from "@/lib/redis";
import { Queue } from "bullmq";
import { SendMailDTO, QUEUE_ENUM } from "@/types/worker";

export const sendMail = async (data: SendMailDTO) => {
  const queue = new Queue(QUEUE_ENUM.EMAIL_QUEUE, { connection: redis });
  await queue.add("send.email", data);
  return true;
};
