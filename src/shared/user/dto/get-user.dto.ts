import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { OrderBy } from "src/common/enum/orderby.enum";
import { SortBy } from "src/common/enum/sortby.enum";
import { UserRole } from "src/common/enum/user-role.enum";
import { UserStatus } from "src/common/enum/user-status.enum";

export class GetUsersDTO {
  @ApiPropertyOptional({ enum: UserRole, })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ enum:UserStatus, description: "User Status" })
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({ description: "Search Keyword User Name or Email)" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SortBy, description: "Sort by Field" })
  @IsOptional()
  sortBy?: SortBy;

  @ApiPropertyOptional({ enum: OrderBy, description: "Sorting Order" })
  @IsOptional()
  
  order?: OrderBy;

  @ApiPropertyOptional({
    default: 1,
    description: "Page Number Must Be Positive Number",
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
  @Min(20)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
