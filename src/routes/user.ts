import { Router as ExpressRouter } from "express";
import { userControllers } from "../controllers";
import { JWTMiddlewares } from "../middlewares";

const router = ExpressRouter();

router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/", JWTMiddlewares, userControllers.getProfile);
router.put("/", JWTMiddlewares, userControllers.update);

export default router;
