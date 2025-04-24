import {
  Controller,
  Post,
  Body,
  Query,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enum/user-role.enum";
import { RolesGuard } from "src/common/guards/roles.guards";
import { AuthGuard } from "src/common/guards/auths.guards";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUsersDTO } from "./dto/get-user.dto";
import { SWAGGER_MESSAGES } from "src/common/constants/swagger-constants";


@ApiTags("Users Controller")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   *User signup
   *
   * @param {CreateUserDto} dto
   * @return {*}
   * @memberof UsersController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.REGISTER })
  @Post("signup")
  async signup(@Body() dto: CreateUserDto) {
    return this.usersService.signupUser(dto);
  }

  /**
   *get User by sorting
   *
   * @param {GetUsersDTO} query
   * @return {*}
   * @memberof UsersController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.GET_ALL_USERS })
  @Get("getAll")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllUsers(@Query() query: GetUsersDTO) {
    {
      return await this.usersService.getAllUsers(query);
    }
  }

  /**
   *get users by id
   *
   * @param {string} id
   * @return {*}
   * @memberof UsersController
   */
  @ApiOperation({ summary: SWAGGER_MESSAGES.GET_USERS })
  @Get("/:id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUserById(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }
}
