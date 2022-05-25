/* eslint-disable max-len */
import { Request, Response, NextFunction } from "express";

export const ResourcesSharing = async (req: Request, res: Response, next: NextFunction) => {
  // Resource sharing for public
  res.header("Cross-Origin-Resource-Policy", "*");
  next();
};
