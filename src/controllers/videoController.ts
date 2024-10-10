import { Request, Response } from "express";
import { db, setDB } from "../db/db";
import { InputCreateVideoType, OutputVideoType } from "../types/videoTypes";

export const videoController = {
  getAllVideos: (req: Request, res: Response<OutputVideoType[]>) => {
    const videos: OutputVideoType[] = db.videos;
    res.status(200).json(videos);
  },
  createVideo: (
    req: Request<any, any, InputCreateVideoType>,
    res: Response<OutputVideoType>
  ) => {
    const movie: OutputVideoType = {
      id: Date.now(),
      ...req.body,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date(Date.now() + 3600000).toISOString(),
    };
    setDB(movie);
    res.status(201).json(movie);
  },
  getOneVideo: (req: Request, res: Response<OutputVideoType>) => {
    const id: number = +req.params.id;
    const video: OutputVideoType | undefined = db.videos.find(
      (v) => v.id == id
    );
    if (video) {
      res.status(200).json(video);
    }
    res.status(404).send();
  },
  updateOneVideo: (req: Request, res: Response<OutputVideoType>) => {
    const id: number = +req.params.id;
    const videoIndex: number = db.videos.findIndex((v) => v.id === id);
    if (videoIndex > -1) {
      db.videos[videoIndex] = { ...db.videos[videoIndex], ...req.body };
      res.status(204).send();
    }
    res.status(404).send();
  },
  deleteOneVideo: (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const videoIndex: number = db.videos.findIndex((v) => v.id === id);
    if (videoIndex === -1) {
      res.status(404).send();
      return
    }
    db.videos.splice(videoIndex, 1);
    res.status(204).send();
  },
};
