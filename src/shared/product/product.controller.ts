import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { AuthGuard } from "src/common/guards/auths.guards";
import { RolesGuard } from "src/common/guards/roles.guards";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enum/user-role.enum";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetProductDto } from "./dto/get-product.dto";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";

@ApiTags("Products Controller")
@Controller("products")
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   *Add new Product
   *
   * @param {CreateProductDto} body
   * @return {*}
   * @memberof ProductController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.ADD_PRODUCT })
  @Post("add")
  @ApiBearerAuth()
  async addProduct(@Body() body: CreateProductDto) {
    return await this.productService.addProduct(body);
  }

  /**
   *Update Existing Product
   *
   * @param {LogInPayload} user
   * @param {UpdateProductDto} body
   * @return {*}
   * @memberof ProductController
   */

  @ApiOperation({ summary: SWAGGER_MESSAGES.PRODUCT_UPDATE })
  @Put("update/:id")
  @ApiBearerAuth()
  async updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProductDto
  ) {
    return await this.productService.updateProduct(id, body);
  }

  /**
   *Get All Products by Searcing, Sorting and Filtering
   *
   * @param {GetProductDto} query
   * @return {*}
   * @memberof ProductController
   */
  @ApiOperation({
    summary: SWAGGER_MESSAGES.GET_ALL_PROD,
  })
  @Get("GetAll")
  @ApiBearerAuth()
  async getAllUsers(@Query() query: GetProductDto) {
    {
      return await this.productService.getAllProducts(query);
    }
  }
}
