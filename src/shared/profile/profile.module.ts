import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  exports: [ProfileService],
})
export class ProfileModule {}
