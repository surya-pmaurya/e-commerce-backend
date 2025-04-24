import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { REVIEW_MESSAGES } from "src/common/constants/reveiw-constants"; 
import { UpdateReviewDTO } from "./dto/update-review.dto";
import { ProductIdDTO } from "./dto/product-id.dto";

@Injectable()
export class ReviewService{
    constructor(private prismaService: PrismaService) { }
    

    /**
     *write a review for the product
     *
     * @param {number} userId
     * @param {CreateReviewDTO} reviewDto
     * @return {*} 
     * @memberof ReviewService
     */
    async submitReview(userId: number, reviewDto: CreateReviewDTO) {
        
        const review = await this.prismaService.review.findUnique({
            where: {
                user_id_product_id: {
                    user_id: Number(userId),
                    product_id:reviewDto.productId
                }
            }
        })

        if (review)
            throw new ConflictException(REVIEW_MESSAGES.EXIST)

        const result = await this.prismaService.review.create({
            data: {
                user_id: Number(userId),
                product_id: reviewDto.productId,
                comment: reviewDto.comment,
                rating:reviewDto.rating
            },
            select: {
                product_id: true,
                comment: true,
                rating:true
            }
        })

        return result;
    }


    /**
     *Update review of product
     *
     * @param {number} userId
     * @param {UpdateReviewDTO} updateReviewDto
     * @return {*} 
     * @memberof ReviewService
     */
    async updateReview(userId: number, updateReviewDto: UpdateReviewDTO) {
        const review = await this.prismaService.review.findUnique({
          where: {
            user_id_product_id: {
              user_id: Number(userId),
              product_id: Number(updateReviewDto.productId),
            },
          },
        });

        if (!review)
            throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND)

        const result = await this.prismaService.review.update({
            where: {
                user_id_product_id: {
                    user_id: Number(userId),
                    product_id: Number(updateReviewDto.productId)
                }
            },
            data: {
                product_id: updateReviewDto.productId,
                comment: updateReviewDto.comment,
                rating: updateReviewDto.rating
            },
            select: {
                product_id: true,
                comment: true,
                rating: true
            }
        });

        return result;
    }

    /**
     *Delete a product review
     *
     * @param {number} userId
     * @param {ProductIdDTO} body
     * @return {*} 
     * @memberof ReviewService
     */
    async deleteReview(userId: number, body: ProductIdDTO) {
        
        const isProductReviewExist = await this.prismaService.review.findUnique({
            where: {
                user_id_product_id: {
                    user_id: Number(userId),
                    product_id: Number(body.productId)
                }
            }
        });

        if (!isProductReviewExist)
            throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND)

        const result = await this.prismaService.review.delete({
            where: {
                user_id_product_id: {
                    user_id: Number(userId),
                    product_id: Number(body.productId)
                }
            },
            select: {
                product_id:true,
                rating: true,
                comment: true
            }
        });

        return result;
    }
 }