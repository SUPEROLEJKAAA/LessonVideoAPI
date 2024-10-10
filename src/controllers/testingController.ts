import { Request, Response } from "express";
import { clearDB } from "../db/db";

export const testingController = {
    clear: (req: Request, res: Response) => {
        clearDB()
        res.status(204).send()
    }
}