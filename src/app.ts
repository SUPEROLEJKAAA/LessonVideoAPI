import express from "express";
import { videoRouter } from "./routers/videoRouter";
import { testingRouter } from "./routers/testingRouter";

export const app = express();

app.use(express.json());
app.use("/videos", videoRouter);
app.use("/testing/", testingRouter)