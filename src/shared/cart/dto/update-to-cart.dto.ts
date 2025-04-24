import { PartialType } from "@nestjs/swagger";
import { AddToCartDTO } from "./add-to-cart.dto";

export class UpdateCartDTO extends PartialType(AddToCartDTO) {}
