import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AUTH_MESSAGES } from "src/common/constants/auth-constants";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailModule } from "src/common/mail/mail.module";
import { AuthGuard } from "src/common/guards/auths.guards";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: AUTH_MESSAGES.AT_EXPIRE },
      }),
    }),
    MailModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
