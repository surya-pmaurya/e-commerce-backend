import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddToCartDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Product ID '})
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Product Quantity' })
  @IsNumber()
  quantity: number;
}