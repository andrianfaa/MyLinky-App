import type { Response as ExpressResponse } from "express";
import { settingServices } from "../services";
import { Response } from "../helpers";

export const settingController = {
  getSetting: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await settingServices.getSetting(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  updateSetting: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await settingServices.updateSetting(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  resetSetting: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await settingServices.resetSetting(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  deleteAccount: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await settingServices.deleteAccount(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
