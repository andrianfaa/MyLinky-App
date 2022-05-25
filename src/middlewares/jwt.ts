import type { Response as ExpressResponse } from "express";
import { Response } from "../helpers";
import { JSONWebToken } from "../utils";
import { User } from "../models";

export const JWTMiddlewares = async (
  req: any,
  res: ExpressResponse,
  next: any,
) => {
  const token = req.headers.authorization?.split(" ")[1] ?? null;

  if (!token) {
    return Response.error(res, 401, {
      message: "Unauthorized",
    });
  }

  try {
    const decoded = await JSONWebToken.verify<DecodedToken>(token);

    if (!decoded) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({
      uid: decoded.uid,
      email: decoded.email,
    });

    if (!user) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    req.user = decoded as DecodedToken;

    return next();
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    return Response.error(res, 500, {
      message: error.message ?? "Internal server error",
    });
  }
};
