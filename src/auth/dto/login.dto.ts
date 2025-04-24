import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Login data transter object class
 *
 * @export
 * @class LoginDTO
 */
export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "Email Field", required: true })
  email: string;

  
  @IsNotEmpty()
  @ApiProperty({ description: "Password Field", required: true })
  pass: string;
}
