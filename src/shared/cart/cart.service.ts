import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AddToCartDTO } from "./dto/add-to-cart.dto";
import { UpdateCartDTO } from "./dto/update-to-cart.dto";
import { CART_MESSAGES } from "src/common/constants/cart-constants";
import { ProductIdDTO } from "../review/dto/product-id.dto";

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  /**
   *Add Item to your Cart
   *
   * @param {number} userId
   * @param {AddToCartDTO} addToCartdto
   * @return {*} 
   * @memberof CartService
   */
  async addToCart(userId: number, addToCartdto: AddToCartDTO) {
    let result: any;

    const isProductExist = await this.prismaService.cart.findUnique({
      where: {
        user_id_product_id: {
          user_id: Number(userId),
          product_id: addToCartdto.productId,
        },
      },
    });

    if (isProductExist) {
      result = await this.prismaService.cart.update({
        where: { id: isProductExist.id },
        data: { quantity: isProductExist.quantity + addToCartdto.quantity },
        select: {
          product: {
            select: {
              name: true,
            },
          },
          quantity: true,
        },
      });
    }

    result = await this.prismaService.cart.create({
      data: {
        user_id: Number(userId),
        product_id: addToCartdto.productId,
        quantity: addToCartdto.quantity,
      },
      select: {
        product: {
          select: {
            name: true,
          },
        },
        quantity: true,
      },
    });

    return result;
  }

  /**
   *Update Cart Product
   *
   * @param {number} userId
   * @param {UpdateCartDTO} updateCartDto
   * @return {*} 
   * @memberof CartService
   */
  async updateCartItem(userId: number, updateCartDto: UpdateCartDTO) {
    const product = await this.prismaService.cart.findUnique({
      where: {
        user_id_product_id: {
          user_id: Number(userId),
          product_id: Number(updateCartDto.productId),
        },
      },
    });

    if (!product) throw new NotFoundException(CART_MESSAGES.NOT_FOUND);

    const result = await this.prismaService.cart.update({
      where: {
        user_id_product_id: {
          user_id: Number(userId),
          product_id: Number(updateCartDto.productId),
        },
      },
      data: {
        user_id: Number(userId),
        product_id: updateCartDto.productId,
        quantity: updateCartDto.quantity,
      },
      select: {
        product: {
          select: {
            name: true,
          },
        },
        quantity: true,
      },
    });
    return result;
  }
 /**
  *Get User Cart byId
  *
  * @param {number} userId
  * @return {*} 
  * @memberof CartService
  */
 async getUserCart(userId: number) {
    return await this.prismaService.cart.findMany({
      where: {
        user_id: userId,
      },
      select: {
        product: {
          select: {
            name: true,
          },
        },
        quantity: true,
      },
    });
  }

  /**
   *Remove Item From CArt
   *
   * @param {number} userId
   * @param {ProductIdDTO} productIdto
   * @return {*} 
   * @memberof CartService
   */
  async removeItemFromCart(userId: number, productIdto: ProductIdDTO) {
    const isProductPresent = await this.prismaService.cart.findUnique({
      where: {
        user_id_product_id: {
          user_id: Number(userId),
          product_id: productIdto.productId,
        },
      },
    });

    if (!isProductPresent)
      throw new NotFoundException(CART_MESSAGES.NOT_IN_CART);

    const result = await this.prismaService.cart.delete({
      where: {
        user_id_product_id: {
          user_id: Number(userId),
          product_id: productIdto.productId,
        },
      },
      select: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return result;
  }
}
