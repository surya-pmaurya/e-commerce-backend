import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOfferDto {
  
  @ApiProperty({ description: "Name of the offer" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "Restaurant Id" })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ description: "Quantity" })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: "Tittle of the offer" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "Points Per Offer" })
  @IsNumber()
  pointsPerOffer: number;
}
