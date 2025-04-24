import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { PrismaService } from "src/prisma.service";
import { MailModule } from "src/common/mail/mail.module";
import { AuthModule } from "src/auth/auth.module";
@Module({
  imports: [MailModule, AuthModule],
  controllers: [OfferController],
  providers: [OfferService, PrismaService],
})
export class OffersModule {}
