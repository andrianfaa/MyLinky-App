import type { Response as ExpressResponse } from "express";
import { Router as ExpressRouter } from "express";
import { Response } from "../helpers";
import { RandomID } from "../utils";
import { ApiKeyMiddlewares, JWTMiddlewares } from "../middlewares";
import { publishControllers } from "../controllers";
// Routes
import userRoute from "./user";
import linkyRoute from "./linky";
import settingRoute from "./setting";
import imageRoute from "./image";

const router = ExpressRouter();

router.get("/", (req: ApiRequest, res: ExpressResponse) => {
  Response.success(res, 200, {
    message: "Welcome to the API",
    data: {
      apikey: RandomID.generate(10),
    },
  } as ApiResponse<{
    apikey: string;
  }>);
});

router.use("/user", ApiKeyMiddlewares, userRoute);
router.use("/linky", ApiKeyMiddlewares, JWTMiddlewares, linkyRoute);
router.use("/setting", ApiKeyMiddlewares, JWTMiddlewares, settingRoute);
router.use("/image", ApiKeyMiddlewares, JWTMiddlewares, imageRoute);

router.post("/publish", ApiKeyMiddlewares, JWTMiddlewares, publishControllers.publish);
router.get("/profile/:username", ApiKeyMiddlewares, publishControllers.getPublishedDataByUsername);

export default router;
