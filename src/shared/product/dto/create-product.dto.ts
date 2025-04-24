import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: "Name of the Product" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: " Description Of The Product" })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: "Price of the Product" })
  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  price: number;

  @ApiProperty({ description: "Product City" })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: "Product State" })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: " Product Country" })
  country: string;
}
