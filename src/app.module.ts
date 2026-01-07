import { Module } from "@nestjs/common";
import { UserModule } from "./shared/user/user.module";
import { AuthModule } from "./auth/auth.module";
import { OffersModule } from "./shared/offer/offer.module";
import { ProfileModule } from "./shared/profile/profile.module";
import { MailModule } from "./common/mail/mail.module";
import { ProductModule } from "./shared/product/product.module";
import { ReviewModule } from "./shared/review/review.module";
import { CartModule } from "./shared/cart/cart.module";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./common/validation.prisma";
import { FavoriteModule } from "./shared/favorite-product/favorite-product.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    AuthModule,
    UserModule,
    OffersModule,
    MailModule,
    ProfileModule,
    ProductModule,
    FavoriteModule,
    CartModule,
    ReviewModule,
  ],
})
export class AppModule {}
