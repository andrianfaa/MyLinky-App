import type { Response as ExpressResponse } from "express";
import { imageServices } from "../services";
import { Response } from "../helpers";

export const imageControllers = {
  uploadProfilePhoto: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await imageServices.uploadProfilePhoto(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
