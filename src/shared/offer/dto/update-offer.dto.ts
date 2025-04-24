import { PartialType } from "@nestjs/mapped-types";
import { CreateOfferDto } from "./create-offer.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @ApiProperty({ description: "Offer Name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Offer Quantity" })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: "offer Title" })
  @IsString()
  title: string;

  @ApiProperty({ description: " Offer Claimed Count" })
  @IsNumber()
  claimedCount: number;

  @ApiProperty({ description: "Points per Offer" })
  @IsNumber()
  pointsPerOffer?: number;
}
