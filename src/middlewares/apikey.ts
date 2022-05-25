import { NextFunction, Response as ExpressResponse } from "express";
import config from "../config";
import { Response } from "../helpers";

export const ApiKeyMiddlewares = async (
  req: ApiRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const { headers } = req;
  const reqApiKey = headers["x-api-key"] ?? null;

  if (!reqApiKey) {
    return Response.error(res, 401, {
      message: "Unauthorized",
    });
  }

  if (reqApiKey !== config.api.key) {
    return Response.error(res, 401, {
      message: "Unauthorized",
    });
  }

  return next();
};
