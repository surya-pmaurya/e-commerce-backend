import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';
import { AUTH_MESSAGES } from "src/common/constants/auth-constants";
import { PrismaService } from "src/prisma.service";
import { PROFILE_MESSAGES } from "src/common/constants/profile-constants";

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   *Upload Profile picture
   *
   * @param {*} file
   * @memberof ProfileService
   */
  async uploadProfile(user_id: number, file: any) {
    if (!file) throw new NotFoundException(AUTH_MESSAGES.FILE_NOT_FOUND);
    const ext = path.extname(file.originalname);
    const fileName = `${user_id}${ext}`;
    const uploadPath = path.join("./uploads", fileName);

    if (fs.existsSync(uploadPath)) {
      throw new ConflictException(PROFILE_MESSAGES.EXIST);
    }
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(uploadPath, file.buffer);

    await this.prisma.user.update({
      where: { id: user_id },
      data: { profile: uploadPath },
    });
  }


  /**
   *Update profile photo
   *
   * @param {number} user_id
   * @param {*} file
   * @memberof ProfileService
   */
  async updateProfile(user_id: number, file: any) {
    if (!file) throw new NotFoundException(PROFILE_MESSAGES.NOT_FOUND)

    const ext = path.extname(file.originalname);
    const filename = `${user_id}${ext}`;
    const uploadPath = path.join("./uploads", filename);

    if (fs.existsSync(uploadPath)) {
      fs.unlinkSync(uploadPath);
    }

    fs.writeFileSync(uploadPath, file.buffer);

    await this.prisma.user.update({
      where: { id: user_id },
      data: { profile: uploadPath },
    });
  }
}
