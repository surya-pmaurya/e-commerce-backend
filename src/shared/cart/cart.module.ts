import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService, PrismaService],
})
export class CartModule {}
