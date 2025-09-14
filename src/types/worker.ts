export enum QUEUE_ENUM {
  EMAIL_QUEUE = "email_queue",
  IMAGE_QUEUE = "image_queue",
}

export interface SendMailDTO {
  email: string;
  content: string;
  subject: string;
}

export interface UploadAvatarDTO {
  userId: string;
  avatar: Buffer;
}

export interface UploadAvatarWorkerDTO {
  file: string;
  filename: string;
  userId: string;
}
