import { Router as ExpressRouter } from "express";
import { settingServices } from "../services";

const router = ExpressRouter();

router.get("/", settingServices.getSetting);
router.put("/", settingServices.updateSetting);
router.delete("/deleteAccount", settingServices.deleteAccount);
router.delete("/reset", settingServices.resetSetting);

export default router;
