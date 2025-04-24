import { PrismaService } from "src/prisma.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";


@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService, PrismaService],
})
export class ProductModule {}
