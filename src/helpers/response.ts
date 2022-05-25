import type { Response as ExpressResponse } from "express";

export interface ResponseOptions<T> {
  message?: string;
  data?: T;
}

export const Response = {
  /**
   * Success response
   * @param res ExpressResponse
   * @param code number
   * @param options ResponseOptions
   * @example Response.success(res, 200, { message: "Hello world" });
   */
  success: <T>(
    res: ExpressResponse,
    code: number,
    options?: ResponseOptions<T | null>,
  ): void => {
    res.status(code).json({
      status: "success",
      statusCode: code,
      ...options,
    } as ApiResponse<T | null>);
  },

  /**
   * Error response
   * @param res ExpressResponse
   * @param code number
   * @param options ResponseOptions
   * @example Response.error(res, 404, { message: "Not found" });
   */
  error: <T>(
    res: ExpressResponse,
    code: number,
    options?: ResponseOptions<T | null>,
  ): void => {
    res.status(code).json({
      status: "error",
      statusCode: code,
      ...options,
    } as ApiResponse<T | null>);
  },
};
