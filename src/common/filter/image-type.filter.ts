import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { PROFILE_MESSAGES } from "../constants/profile-constants";

export const imageFileFilter = (
  req: Request,
  file: any,
  callback: (error: Error | null, acceptFile: boolean) => void
) => {
  if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp|gif)$/)) {
    return callback(new BadRequestException(PROFILE_MESSAGES.TYPE), false);
  }
  callback(null, true);
};
