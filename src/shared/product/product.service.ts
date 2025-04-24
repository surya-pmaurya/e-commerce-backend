import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { PRODUCT_MESSAGES } from "src/common/constants/product-constants";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetProductDto } from "./dto/get-product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   *Add A new Product
   *
   * @param {CreateProductDto} body
   * @return {*}
   * @memberof ProductService
   */
  async addProduct(body: CreateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { name: body.name },
    });

    if (existingProduct)
      throw new ConflictException(PRODUCT_MESSAGES.EXISTED);

    const result = await this.prisma.product.create({
      data: { ...body },
    });
    return { message: PRODUCT_MESSAGES.CREATED };
  }

  /**
   *Update an Existing Product
   *
   * @param {UpdateProductDto} body
   * @return {*}
   * @memberof ProductService
   */
  async updateProduct(productId: number, body: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct)
      throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);

    await this.prisma.product.update({
      where: { id: productId },
      data: { ...body },
    });
    return { message: PRODUCT_MESSAGES.UPDATED };
  }

  /**
   *Get all product by seasrching and sorting
   *
   * @param {GetProductDto} query
   * @return {*}
   * @memberof ProductService
   */
  async getAllProducts(query: GetProductDto) {
    const { sort, order, search, basePrice, page = 1, limit = 20 } = query;

    const skip = (page - 1) * limit;
    const whereClause: any = {
      ...(search && {
        OR: [{ name: { contains: search } }, { city: { contains: search } }],
      }),
      ...(basePrice && {
        price: { lt: Number(basePrice) },
      }),
    };

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: whereClause,
        orderBy: sort ? { [sort]: order } : undefined,
        skip,
        take: Number(limit),
      }),
      this.prisma.product.count({ where: whereClause }),
    ]);
    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.round(total / limit),
      },
    };
  }
}
