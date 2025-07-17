import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { FAVORITE_MESSAGES } from "src/common/constants/favorite-constants";
import { PRODUCT_MESSAGES } from "src/common/constants/product-constants";
import { USER_MESSAGES } from "src/common/constants/user-constants";
import { LogInPayload } from "src/common/interfaces/payload.interface";
import { SuccessResponse } from "src/interceptor/success-response.interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   *Addd favorite products for logedin user
   *
   * @param {number} user_id
   * @param {number} product_id
   * @return {*}  {Promise<SuccessResponse<any>>}
   * @memberof FavoriteService
   */
  async addToFavorites(
    user_id: number,
    product_id: number
  ): Promise<SuccessResponse<any>> {
    if (!user_id) throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    const product = await this.prisma.product.findUnique({
      where: { id: product_id },
    });
    if (!product) throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);

    const check = await this.prisma.favorite.findFirst({
      where: {
        user_id: Number(user_id),
        product_id: product_id,
      },
    });
    if (check) throw new ConflictException(PRODUCT_MESSAGES.EXISTED);

    const result = await this.prisma.favorite.create({
      data: {
        user_id: Number(user_id),
        product_id: product_id,
      },
    });
    if (!result)
      throw new InternalServerErrorException(PRODUCT_MESSAGES.NOT_CREATED);
    return { message: FAVORITE_MESSAGES.ADDED };
  }

  /**
   *get favorite products list of logedin user
   *
   * @param {number} user_id
   * @return {*}
   * @memberof FavoriteService
   */
  async fetchFavorites(user: LogInPayload) {
    const result = await this.prisma.favorite.findFirst({
      where: { user_id: user.userId },
      include: {
        Product: true,
      },
    });
    if (!result) throw new NotFoundException(PRODUCT_MESSAGES.EMPTY);
    return result;
  }

  /**
   *remove favorite product by Product id
   *
   * @param {number} user_id
   * @param {number} product_id
   * @return {*}
   * @memberof FavoriteService
   */
  async removeFavorite(user_id: number, product_id: number) {
    const check = await this.prisma.favorite.findFirst({
      where: { user_id, product_id },
    });
    if (!check) throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);

    await this.prisma.favorite.deleteMany({
      where: { user_id, product_id },
    });
    return { message: PRODUCT_MESSAGES.DELETED };
  }

  
  /**
   *remove all favorite product of current loggedin user
   *
   * @param {number} user_id
   * @return {*}
   * @memberof FavoriteService
   */
  async removeAllFavorite(user_id: number) {
    const result = await this.prisma.favorite.deleteMany({
      where: { user_id },
    });
    if (result.count == 0)
      throw new NotFoundException(PRODUCT_MESSAGES.EMPTY);
  }
}
