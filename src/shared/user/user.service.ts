import {
  Injectable,
  NotFoundException,
  HttpStatus,
  ConflictException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../prisma.service";
import { MailService } from "../../common/mail/mail.service";
import { SuccessResponse } from "../../interceptor/success-response.interface";
import { USER_MESSAGES } from "../../common/constants/user-constants";
import { GetUsersDTO } from "./dto/get-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private mailService: MailService
  ) {}

  /**
   *User signup or account registration
   *
   * @param {CreateUserDto} dto
   * @return {*}
   * @memberof UsersService
   */
  async signupUser(dto: CreateUserDto): Promise<SuccessResponse<any>> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) throw new ConflictException(USER_MESSAGES.EMAIL_EXISTS);

    const hashedPassword = await bcrypt.hash(dto.pass, 10);
    await this.prisma.user.create({
      data: { ...dto, pass: hashedPassword },
    });

    // sending singnup mail to the register  user.
    await this.mailService.signupMail(dto.email, dto.name);
    return {
      message: USER_MESSAGES.REGISTER_SUCCESS,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   *Get all users by searching and filtering
   *
   * @param {UserRole} [role]
   * @param {string} [status]
   * @param {string} [search]
   * @param {('email' | 'name')} [sortBy]
   * @param {('asc' | 'desc')} [order]
   * @return {*}
   * @memberof UsersService
   */
  async getAllUsers(query: GetUsersDTO) {
    const { role, status, search, sortBy, order, page = 1, limit = 20 } = query;

    const skip = (page - 1) * limit;
    const whereClause: any = {
      ...(role && { role }),
      ...(status && { status }),
      ...(search && {
        OR: [{ name: { contains: search } }, { email: { contains: search } }],
      }),
    };

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: whereClause,
        orderBy: sortBy ? { [sortBy]: order || "asc" } : undefined,
        skip,
        take: Number(limit),
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return {
      message: USER_MESSAGES.USER_LIST,
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.round(total / limit),
      },
    };
  }

  /**
   *get users by id
   *
   * @param {number} id
   * @memberof UsersService
   */
  async getUserById(userId: number): Promise<SuccessResponse<any>> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    return {
      message: USER_MESSAGES.USER,
      data: user,
      statusCode: 200,
    };
  }
}
