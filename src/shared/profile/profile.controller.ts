import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Put,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/common/guards/auths.guards";
import * as multer from "multer";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { PROFILE_MESSAGES } from "src/common/constants/profile-constants";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { LogInPayload } from "src/common/interfaces/payload.interface";
import { imageFileFilter } from "src/common/filter/image-type.filter";
@ApiTags("Profile Controller")
@Controller("profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  /**
   *Uploading Profile photo
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.UPLOAD_PROFILE })
  @Post("upload/")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
    })
  )
  async uploadFile(
    @AuthUser() user: LogInPayload,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.profileService.uploadProfile(user.userId, file);
    return { message: PROFILE_MESSAGES.CREATED };
  }

  @Put("update")
  @UseGuards(AuthGuard)
  @Post("login")
  @ApiOperation({ summary: SWAGGER_MESSAGES.UPDATE_PROFILE})
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
    })
  )
  async updateProfile(
    @AuthUser() user: LogInPayload,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.profileService.updateProfile(user.userId, file);
    return {
      message: PROFILE_MESSAGES.UPDATED,
    };
  }
}
