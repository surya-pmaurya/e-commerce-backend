import { ApiPropertyOptional } from "@nestjs/swagger";

import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { SortByProduct } from "../enums/pro-sortby.enum";
import { OrderBy } from "src/common/enum/orderby.enum";

export class GetProductDto {
  @ApiPropertyOptional({ enum: SortByProduct, description: "Sort Product by Product Name or City Name"})
  @IsOptional()
  sort: SortByProduct;

  @ApiPropertyOptional({ enum: OrderBy, description: "Product OrderBy ASC or DESC" })
  @IsOptional()
  order: OrderBy;

  @ApiPropertyOptional({ description: "Product Search Keyword Product Name or City Name" })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({ description: "Search product by Bellow Price "})
  @IsOptional()
  basePrice?: number;

  
  @ApiPropertyOptional({
    default: 1,
    description: "Page Number Must Be Positive",
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    default: 20,
    description: "A Page Can Contain 20 Records Only",
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
