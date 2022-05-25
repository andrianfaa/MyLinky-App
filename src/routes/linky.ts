import { Router as ExpressRouter } from "express";
import { linkyControllers } from "../controllers";

const router = ExpressRouter();

router.get("/", linkyControllers.getLinky);
router.put("/", linkyControllers.updateLinks);
router.put("/publish/:id", linkyControllers.toggleLinkPublish);
router.put("/drag-and-drop", linkyControllers.dragAndDrop);

export default router;
