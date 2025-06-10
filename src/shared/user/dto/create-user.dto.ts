import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsEmail,
  MaxLength,
  IsString,
  IsOptional,
} from "class-validator";
import { UserRole } from "src/common/enum/user-role.enum";

export class CreateUserDto {
  @Optional()
  user_id: number;

  @ApiProperty({ required: true })
  @MaxLength(18, { message: "Name shoud not contain more than 18 charactors" })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @MinLength(6, {
    message: "Password must have 6 character and contaions number also",
  })
  @IsNotEmpty()
  pass: string;

  @ApiProperty({ required: true })
  status: string;

  @ApiProperty({ required: true })
  @IsEnum(UserRole, { message: "Role must be an Admin or User" })
  role: UserRole;

  @IsOptional()
  otp?: number;
}
