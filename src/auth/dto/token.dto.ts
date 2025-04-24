import { ApiProperty } from "@nestjs/swagger";

export class TokenDTO {
  @ApiProperty({ description: "Access token property" })
    
  accessToken: string;
}
