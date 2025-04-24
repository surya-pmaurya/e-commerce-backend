import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { OfferService } from "./offer.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enum/user-role.enum";
import { AuthGuard } from "src/common/guards/auths.guards";
import { RolesGuard } from "src/common/guards/roles.guards";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SuccessResponse } from "src/interceptor/success-response.interface";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";
import { OFFER_MESSAGES } from "src/common/constants/offer-constants";

@ApiTags("Offer Controller")
@Controller("offers")
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OfferController {
  constructor(private readonly offersService: OfferService) {}

  /**
   * Offer creation  //
   * @param {CreateOfferDto} body
   * @param {Request} req
   * @return {*}  {Promise<SuccessResponse<any>>}
   * @memberof OfferController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.CREATE_OFFER })
  @Post("create")
  @ApiBearerAuth()
  async createOffer(
    @Body() body: CreateOfferDto,
  ): Promise<SuccessResponse<any>> {
    const result = await this.offersService.createOffer(body);
    {
      return {
        message: OFFER_MESSAGES.CREATED,
        statusCode: HttpStatus.CREATED,
      };
    }
  }

  /**
   *Offfre updation By Id
   *
   * @param {number} id
   * @param {UpdateOfferDto} dto
   * @return {*}
   * @memberof OfferController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.UPDATE_OFFERS })
  @Put("update/:id")
  @ApiBearerAuth()
  async updateOffer(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOfferDto) {
    return this.offersService.updateOffer(id, dto);
  }
}