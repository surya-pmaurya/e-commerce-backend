import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { setErrorResponse } from "./error.response";
import { Prisma } from "@prisma/client";
import { MulterError } from "multer";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any)?.response?.message
      ? (exception as any)?.response?.message
      : (exception as any)?.message;
    let code = "HttpException";

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case NotFoundException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case ForbiddenException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case UnauthorizedException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientKnownRequestError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as Prisma.PrismaClientKnownRequestError).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientInitializationError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as Prisma.PrismaClientInitializationError).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientUnknownRequestError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as Prisma.PrismaClientUnknownRequestError).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientValidationError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as Prisma.PrismaClientValidationError).message;
        code = (exception as any).code;
        break;
      case BadRequestException:
        status = (exception as HttpException).getStatus();
        message = (exception as any)?.response?.message
          ? (exception as any)?.response?.message
          : (exception as any)?.message;
        code = (exception as any).code;
        break;
      case MulterError:
        const multerMessageMap = {
          LIMIT_FILE_SIZE: "File too large (max 5MB)",
          LIMIT_UNEXPECTED_FILE: "Only image files are allowed",
        };

        const errCode = (exception as MulterError).code;
        status = HttpStatus.BAD_REQUEST;
        message =
          multerMessageMap[errCode] || (exception as MulterError).message;
        code = errCode;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response
      .status(status)
      .json(setErrorResponse(status, message, code, request));
  }
}
