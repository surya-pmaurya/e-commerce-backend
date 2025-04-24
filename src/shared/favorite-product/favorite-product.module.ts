import { Module } from "@nestjs/common";
import { FavoriteController } from "./favorite-product.controller";
import { FavoriteService } from "./favorite-product.service";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService,],
})
export class FavoriteModule {}
