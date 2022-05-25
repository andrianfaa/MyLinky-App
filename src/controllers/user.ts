import type { Response as ExpressResponse } from "express";
import { Response } from "../helpers";
import { userServices } from "../services";

export const userControllers = {
  login: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await userServices.login(req, res);
    } catch (err: any) {
      return Response.error(res, 500, {
        message: err.message ?? "Internal server error",
      });
    }
  },

  register: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await userServices.register(req, res);
    } catch (err: any) {
      return Response.error(res, 500, {
        message: err.message ?? "Internal server error",
      });
    }
  },

  getProfile: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await userServices.getProfile(req, res);
    } catch (err: any) {
      return Response.error(res, 500, {
        message: err.message ?? "Internal server error",
      });
    }
  },

  update: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await userServices.update(req, res);
    } catch (err: any) {
      return Response.error(res, 500, {
        message: err.message ?? "Internal server error",
      });
    }
  },
};
