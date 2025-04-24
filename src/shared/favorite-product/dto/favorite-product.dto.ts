import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class FavoriteProductDto {

  @ApiProperty({
    description: "Set product Id to Add and Remove From Favorite",
  })
  @IsInt()
  product_id: number;
}
