import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateReviewDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty({ description: 'Product ID', required: true })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'Product Rating' })
    @IsNumber()
    @Min(1, { message: 'Ratings should be in between 1 to 10' })
    @Max(10, { message: 'Rating should be in between 1 to 10' })
    rating: number;

    @ApiProperty({ description: 'Review of product', required: true })
    @IsString()
    comment: string;
}
