import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AUTH_MESSAGES } from "../constants/auth-constants";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.authService.validateToken(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.UNAUTHORIZED);
    }
    return true;
  }
  /**
   *Extracting token from cookie
   *
   * @private
   * @param {Request} request
   * @return {*}  {(string | undefined)}
   * @memberof AuthGuard
   */
  private extractTokenFromCookie(request: Request): string | undefined {
    const [type, token] = request.cookies["Authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
