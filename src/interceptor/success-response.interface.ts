export interface SuccessResponse<T> {
    statusCode?: number;
    message?: string;
    data?: T;
    code?: number;
    error?: boolean;
}