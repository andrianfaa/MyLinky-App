import type { Response as ExpressResponse } from "express";
import { Response } from "../helpers";
import { publishServices } from "../services";

export * from "./linky";
export * from "./setting";
export * from "./user";
export * from "./image";

export const publishControllers = {
  publish: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await publishServices.publishLinky(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  getPublishedDataByUsername: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await publishServices.getPublishedDataByUsername(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
