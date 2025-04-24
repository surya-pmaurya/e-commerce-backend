import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  newPassword: string;

  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsNumber()
  otp: number;
}
