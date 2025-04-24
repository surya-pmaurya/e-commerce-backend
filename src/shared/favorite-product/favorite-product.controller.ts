import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auths.guards";
import { FavoriteService } from "./favorite-product.service";
import { FavoriteProductDto } from "./dto/favorite-product.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enum/user-role.enum";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { LogInPayload } from "src/common/interfaces/payload.interface";
import { PRODUCT_MESSAGES } from "src/common/constants/product-constants";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";

@ApiBearerAuth()
@ApiTags("Favorite Products Controller")
@Controller("favorites")
@UseGuards(AuthGuard)
@Roles(UserRole.USER)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  /**
   *Add favorite product
   *
   * @param {LogInPayload} user
   * @param {FavoriteProductDto} dto
   * @return {*}
   * @memberof FavoriteController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.ADD_FAV_ITEM })
  @Post("add")
  async addToFavorite(
    @AuthUser() user: LogInPayload,
    @Body() dto: FavoriteProductDto
  ) {
    return await this.favoriteService.addToFavorites(
      user.userId,
      dto.product_id
    );
  }

  /**
   *get favorite product list of a logedin user
   * @param {number} userId
   * @return {*}
   * @memberof FavoriteController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.GET_ALL_FAV_PRO })
  @Get("getAll")
  async getAll(@AuthUser() user: LogInPayload) {
    const result = await this.favoriteService.fetchFavorites(user);
    return {
      message: PRODUCT_MESSAGES.PRODUCT_LIST,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  /**
   *deleting favorite Product by product id
   *
   * @param {number} user_id
   * @param {FavoriteProductDto} body
   * @return {*}
   * @memberof FavoriteController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.DELETE_FAVORITE_PRODUCT})
  @Delete(":product_id")
  async removeFavorite(
    @AuthUser() user: LogInPayload,
    @Body() body: FavoriteProductDto
  ) {
    return await this.favoriteService.removeFavorite(user.userId, body.product_id);
  }

  /**
   *Delete all favorite product for a logged in user
   *
   * @param {number} user_id
   * @return {*}
   * @memberof FavoriteController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.DELETE_ALL_FAV_PRO})
  @Delete()
  async removeAllFavorite(@AuthUser("user_id") user_id: number) {
    return await this.favoriteService.removeAllFavorite(user_id);
  }
}
