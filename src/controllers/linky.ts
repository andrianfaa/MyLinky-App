import type { Response as ExpressResponse } from "express";
import { linkyServices } from "../services";
import { Response } from "../helpers";

export const linkyControllers = {
  getLinky: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await linkyServices.getLinky(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  updateLinks: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await linkyServices.updateLinks(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  toggleLinkPublish: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await linkyServices.toggleLinkPublish(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  dragAndDrop: async (req: ApiRequest, res: ExpressResponse) => {
    try {
      return await linkyServices.dragAndDropLinks(req, res);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },
};
