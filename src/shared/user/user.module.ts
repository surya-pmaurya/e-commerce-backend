import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { MailModule } from "src/common/mail/mail.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [MailModule, AuthModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UserModule {}
