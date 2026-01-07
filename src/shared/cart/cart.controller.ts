import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDTO } from "./dto/add-to-cart.dto";
import { CART_MESSAGES } from "src/common/constants/cart-constants";
import { AuthUser } from "src/common/decorators/auth.decorator";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auths.guards";
import { RolesGuard } from "src/common/guards/roles.guards";
import { UpdateCartDTO } from "./dto/update-to-cart.dto";
import { ProductIdDTO } from "../review/dto/product-id.dto";
import { LogInPayload } from "src/common/interfaces/payload.interface";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";

@ApiBearerAuth()
@ApiTags("Cart Controller")
@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  /**
   * Adds a product to the authenticated user's cart.
   *
   * @param user - Authenticated user payload.
   * @param body - DTO containing product ID and quantity.
   * @returns A success response with the updated cart data.
   */
  @Post("add-product")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.ADD_PROD_TO_CART })
  @ApiResponse({
    description: CART_MESSAGES.ADDED,
    status: HttpStatus.CREATED,
  })
  async addToCart(@AuthUser() user: LogInPayload, @Body() body: AddToCartDTO) {
    const result = await this.cartService.addToCart(user.userId, body);
    return {
      message: CART_MESSAGES.ADDED,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  /**
   *Update cart product
   *
   * @param {LogInPayload} user
   * @param {UpdateCartDTO} body
   * @return {*}
   * @memberof CartController
   */
  @Put("update-product")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.UPDATE_PROD_FROM_CART })
  @ApiResponse({
    description: CART_MESSAGES.UPDATED,
    status: HttpStatus.OK,
  })
  async updateCartItem(
    @AuthUser() user: LogInPayload,
    @Body() body: UpdateCartDTO
  ) {
    const result = await this.cartService.updateCartItem(user.userId, body);
    return {
      message: CART_MESSAGES.UPDATED,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  /**
   *Get all Product available in cart
   *
   * @param {LogInPayload} user
   * @return {*}
   * @memberof CartController
   */
  @Get("getAll")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.GET_ALL_PROD_FROM_CART })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CART_MESSAGES.FETCHED,
  })
  async getUserCart(@AuthUser() user: LogInPayload) {
    const cartItems = await this.cartService.getUserCart(user.userId);
    return {
      message: CART_MESSAGES.FETCHED,
      statusCode: HttpStatus.OK,
      data: cartItems,
    };
  }

  /**
   *Delete product available in cart
   *
   * @param {LogInPayload} user
   * @param {ProductIdDTO} productIdDTO
   * @return {*}
   * @memberof CartController
   */
  @Delete("delete-item")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.DELETE_ITEM_FROM_CART })
  async deleteProductFromCart(
    @AuthUser() user: LogInPayload,
    @Body() productIdDTO: ProductIdDTO
  ) {
    const result = await this.cartService.removeItemFromCart(
      user.userId,
      productIdDTO
    );

    return {
      message: CART_MESSAGES.DELETED,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
