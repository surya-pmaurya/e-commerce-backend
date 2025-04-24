import { PartialType } from "@nestjs/swagger";
import { CreateReviewDTO } from "./create-review.dto";

export class UpdateReviewDTO extends PartialType(CreateReviewDTO){}