import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { MailService } from "src/common/mail/mail.service";
import { UserRole } from "src/common/enum/user-role.enum";
import { OFFER_MESSAGES } from "src/common/constants/offer-constants";

@Injectable()
export class OfferService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  
  /**
   *Offer Creation
   *
   * @param {CreateOfferDto} dto
   * @return {*} 
   * @memberof OfferService
   */
  async createOffer(dto: CreateOfferDto) {
    const offer = await this.prisma.offer.createMany({
      data: dto,
    });
    const users = await this.prisma.user.findMany({
      where: { role: UserRole.USER }, //Sending emails to normal users only not Admin
    });

    users.map((user) => {
      this.mailService.offerMail(
        user.email,
        "🎉 New Offer Just Dropped!",
        user.name,
        dto
      );
    });
    return { message: OFFER_MESSAGES.CREATED };
  }

  /**
   *Update offer | Only admin can update
   *
   * @param {number} id
   * @param {UpdateOfferDto} dto
   * @return {*}
   * @memberof OfferService
   */
  async updateOffer(id: number, dto: UpdateOfferDto) {
    const offerId = await this.prisma.offer.findUnique({ where: { id } });
    if (!offerId) {
      throw new NotFoundException(OFFER_MESSAGES.NOT_FOUND);
    }
    await this.prisma.offer.updateMany({
      where: { id },
      data: dto,
    });
    return { message: OFFER_MESSAGES.UPDATED };
  }
}
