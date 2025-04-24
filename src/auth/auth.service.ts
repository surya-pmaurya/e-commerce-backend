import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { MailService } from "src/common/mail/mail.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginDTO } from "./dto/login.dto";
import { TokenDTO } from "./dto/token.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { USER_MESSAGES } from "src/common/constants/user-constants";
import { PASSWORD_MESSAGES } from "src/common/constants/pass-constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  /**
   * loginUser
   *
   * @param {LoginDTO} body
   * @return {*}  {Promise<TokenDTO>}
   * @memberof AuthService
   */

  async loginUser(body: LoginDTO): Promise<TokenDTO> {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    const isPassValid = await bcrypt.compare(body.pass, user.pass);
    if (!isPassValid)
      throw new UnauthorizedException(USER_MESSAGES.INVALID_CREDENTIALS);

    const payload = {
      userId: user.user_id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async deleteUser(user_id: number) { 
    await this.prisma.user.delete({
      where: {user_id}
    })
  }

  /**
   *sent email to reset your password
   *
   * @param {ForgotPasswordDto} emaildto
   * @memberof AuthService
   */

  async sendResetPasswordMail(emaildto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { ...emaildto },
    });
    if (!user) throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    await this.prisma.user.update({
      where: { user_id: user.user_id },
      data: { otp: randomToken },
    });
    const resetLink = PASSWORD_MESSAGES.EMAIL_LINK;
    await this.mailService.sendResetMail(
      emaildto.email,
      resetLink,
      randomToken
    );
  }

  /**
   *Set a New Password for the user
   *
   * @param {ResetPasswordDto} resetDto
   * @memberof AuthService
   */
  async setNewPassword(resetDto: ResetPasswordDto) {
    const { email, newPassword, otp } = resetDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException(PASSWORD_MESSAGES.EMAIL_NOT_FOUND);
    const storedToken = user.otp;
    if (otp != storedToken) {
      throw new NotFoundException(PASSWORD_MESSAGES.OTP_MISSMATCH);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { email },
      data: { pass: hashedPassword },
    });
    return { message: PASSWORD_MESSAGES.PASS_RESET_SUCCESS };
  }

  async validateToken(token: any) {
    const payload = await this.jwtService.verifyAsync<any>(token);
    return payload;
  }
}
