import { Controller, Post, Body, HttpStatus, Req, Delete, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { Request } from "express";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { PASSWORD_MESSAGES } from "src/common/constants/pass-constants";
import { USER_MESSAGES } from "src/common/constants/user-constants";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";
import { SuccessResponse } from "src/interceptor/success-response.interface";
import { LogInPayload } from "src/common/interfaces/payload.interface";

@ApiTags("Authentication Controller")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *Login Registered user with email and Password
   * @param {LoginDTO} body
   * @return {*}
   * @memberof AuthController
   */

  @Post("login-user")
  @ApiOperation({
    description: "LOGIN API",
    summary: SWAGGER_MESSAGES.LOGIN,
  })
  async login(@Body() body: LoginDTO, @Req() req: Request) {
    const result = await this.authService.loginUser(body);
    req.res?.cookie("Authorization", `Bearer ${result.accessToken}`, {
      httpOnly: true,
    });
    return {
      message: USER_MESSAGES.LOGIN_SUCCESS,
      statusCode: HttpStatus.CREATED,
      result,
    };
  }

  
/**
 *Log out user
 *
 * @param {Request} req
 * @return {*}  {Promise <SuccessResponse<any>>}
 * @memberof AuthController
 */
@Post('logout-user')
  @ApiOperation({ summary: SWAGGER_MESSAGES.LOGUT })
  async logoutUser(@Req() req: Request) : Promise <SuccessResponse<any>> {
    req.res?.clearCookie('Authorization')
    return {
      statusCode: HttpStatus.OK,
      message: USER_MESSAGES.LOGOUT_SUCCES
    }
  } 
  

  @Delete('delete-user')
  @ApiOperation({ summary: SWAGGER_MESSAGES.DELETE })
  async deleteUser(@Body() user: LogInPayload) {
    if (!user.userId) {
      throw new BadRequestException();
    }
    await this.authService.deleteUser(user.userId)
    }
/**
 *forgot password send reset request 
 *
 * @param {ForgotPasswordDto} body
 * @return {*} 
 * @memberof AuthController
 */
@ApiOperation({ summary: PASSWORD_MESSAGES.PASS_RESET_MAIL })
  @Post("forgot-password")
  async sendResetPassLink(@Body() body: ForgotPasswordDto) {
    await this.authService.sendResetPasswordMail(body);
    return { message: PASSWORD_MESSAGES.PASS_RESET_CODE_SENT };
  }


  /**
   *set new pass with given otp
   *
   * @param {ResetPasswordDto} body
   * @return {*} 
   * @memberof AuthController
   */

  @ApiOperation({ summary: PASSWORD_MESSAGES.SET_NEW_PASS })
  @Post("reset-password")
  async setNewPassword(@Body() body: ResetPasswordDto) {
    await this.authService.setNewPassword(body);
    return { Message: PASSWORD_MESSAGES.PASS_RESET_SUCCESS };
  }
}
