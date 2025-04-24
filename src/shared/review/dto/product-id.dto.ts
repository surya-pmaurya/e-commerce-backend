import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ProductIdDTO{
    @ApiProperty({description:"Product ID" , required:true})
    @IsNumber()
    productId: number;
}