import { Router as ExpressRouter } from "express";
import { imageControllers } from "../controllers";
import { FileUploadMiddleware } from "../middlewares";

const router = ExpressRouter();

router.post("/upload/profile-photo", FileUploadMiddleware.single("photo"), imageControllers.uploadProfilePhoto);

export default router;
