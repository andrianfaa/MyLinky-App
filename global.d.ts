import type { Request } from "express";

declare global {
  interface ApiResponse<T = null> {
    status: "success" | "error";
    statusCode: number;
    message?: string;
    data?: T;
  }

  interface DecodedToken {
    uid: string;
    email: string;
  }

  interface ApiRequest extends Request {
    user?: DecodedToken;
  }
}

export {};
