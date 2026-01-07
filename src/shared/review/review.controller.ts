import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { LogInPayload } from "src/common/interfaces/payload.interface";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { REVIEW_MESSAGES } from "src/common/constants/reveiw-constants";
import { AuthGuard } from "src/common/guards/auths.guards";
import { RolesGuard } from "src/common/guards/roles.guards";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateReviewDTO } from "./dto/update-review.dto";
import { ProductIdDTO } from "./dto/product-id.dto";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";

@ApiBearerAuth()
@ApiTags("Product Review Controller")
@Controller("review")
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  /**
   *Submit Product review
   *
   * @param {LogInPayload} user
   * @param {CreateReviewDTO} reviewDto
   * @return {*}
   * @memberof ReviewController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.SUBMIT_REVIEW })
  @Post("submit")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    description: REVIEW_MESSAGES.SUBMIT,
    status: HttpStatus.OK,
  })
  async submitReview(
    @AuthUser() user: LogInPayload,
    @Body() reviewDto: CreateReviewDTO
  ) {
    const result = await this.reviewService.submitReview(
      user.userId,
      reviewDto
    );

    return {
      message: REVIEW_MESSAGES.SUBMIT,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  /**
   *Update Review
   *
   * @param {LogInPayload} user
   * @param {UpdateReviewDTO} updateReviewDto
   * @return {*}
   * @memberof ReviewController
   */
  @Put("update")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.UPDATE_REVIEW })
  @ApiResponse({
    description: REVIEW_MESSAGES.UPDATE,
    status: HttpStatus.OK,
  })
  async updateReview(
    @AuthUser() user: LogInPayload,
    @Body() updateReviewDto: UpdateReviewDTO
  ) {
    const result = await this.reviewService.updateReview(
      user.userId,
      updateReviewDto
    );
    return {
      message: REVIEW_MESSAGES.UPDATE,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  /**
   *Delete a review
   *
   * @param {LogInPayload} user
   * @param {ProductIdDTO} productId
   * @return {*}
   * @memberof ReviewController
   */
  @Delete("delete")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: SWAGGER_MESSAGES.DELETE_REVIEW })
  @ApiResponse({
    description: REVIEW_MESSAGES.UPDATE,
    status: HttpStatus.OK,
  })
  async deleteProductReview(
    @AuthUser() user: LogInPayload,
    @Body() productId: ProductIdDTO
  ) {
    const result = await this.reviewService.deleteReview(
      user.userId,
      productId
    );
    return {
      message: REVIEW_MESSAGES.DELETE,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
