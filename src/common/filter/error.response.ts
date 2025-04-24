import { Request } from 'express';
import { IResponseError } from './error-response.interface';

export const setErrorResponse: (
    statusCode: number,
    message: string,
    code: string,
    request: Request,
) => IResponseError = (statusCode: number, message: string, code: string, request: Request): IResponseError => ({
    statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
});
