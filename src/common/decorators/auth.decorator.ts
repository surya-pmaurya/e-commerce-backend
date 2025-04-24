import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { user } from "@prisma/client";
/**
 * A decorator that injects the authenticated user into a controller method.
 *
 * This decorator uses the `ExecutionContext` to access the underlying HTTP request,
 * and extracts the authenticated user from the request object.
 *
 * @param {unknown} data - Not used, but required by the `createParamDecorator` signature.
 * @param {ExecutionContext} ctx - The execution context of the controller method.
 * @returns {any} The authenticated user.
 */

export const AuthUser = createParamDecorator(
  (data: keyof user | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
  }
);
