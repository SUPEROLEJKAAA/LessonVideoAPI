import { Router } from "express";
import { videoController } from "../controllers/videoController";
import { videoMiddleware } from "../middlewares/videoMiddleware";

export const videoRouter = Router();

videoRouter.get("/", videoController.getAllVideos);
videoRouter.get("/:id", videoController.getOneVideo);
videoRouter.post("/", videoMiddleware.validateNewVideo, videoController.createVideo);
videoRouter.put("/:id", videoMiddleware.validateUpdateVideo, videoController.updateOneVideo)
videoRouter.delete("/:id", videoController.deleteOneVideo)
