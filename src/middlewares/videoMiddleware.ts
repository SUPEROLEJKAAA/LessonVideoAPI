import { Request, Response, NextFunction } from "express";
import { Resolutions } from "../types/videoTypes";
import { errorsType } from "../types/errorTypes";

function checkingConditions(
  body: any,
  availableFields: string[],
  receivedFields: string[]
): errorsType {
  const errors: errorsType = {
    errorsMessages: [],
  };
  receivedFields.unshift("unknown")

  const conditionsAndMessages: any = {
    unknown: {
      condition: receivedFields.find((r) => !availableFields.includes(r)),
      message: "You've specified a field that is not expected",
    },
    title: {
      condition: body.title.length > 40 || body.title.length < 1,
      message: "The length of the title should be between 1 and 40 characters.",
    },
    author: {
      condition: body.author.length > 20 || body.author.length < 1,
      message: "The length of the author should be between 1 and 20 characters.",
    },
    availableResolutions: {
      condition:
        !Array.isArray(body.availableResolutions) ||
        body.availableResolutions.find(
          (p: keyof typeof Resolutions) => !Resolutions[p]
        ),
      message: "Incorrect video resolutions available",
    },
    canBeDownloaded: {
      condition: typeof body.canBeDownloaded === "boolean",
      message: "The type must be boolean",
    },
    minAgeRestriction: {
      condition:
        (body.minAgeRestriction > 0 && body.minAgeRestriction <= 18) ||
        body.minAgeRestriction === null,
      message: "The value must be between 1 and 18 (inclusive) or null",
    },
    publicationDate: {
      condition: typeof body.publicationDate === "string",
      message: "The parameter must be a string",
    },
  };

  for (const field of receivedFields) {
    if (conditionsAndMessages[field].condition) {
      errors.errorsMessages.push({
        message: conditionsAndMessages[field].message,
        field,
      });
    }
  }

  return errors;
}

const availableFields = {
  new: ["title", "author", "availableResolutions", "unknown"],
  update: [
    "title",
    "author",
    "availableResolutions",
    "canBeDownloaded",
    "minAgeRestriction",
    "publicationDate",
    "unknown"
  ],
};

const validate =
  (availableFields: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const receivedFields: string[] = Object.keys(req.body);
    const errors: errorsType = checkingConditions(
      req.body,
      availableFields,
      receivedFields
    );

    if (errors.errorsMessages.length) {
      res.status(400).send(errors);
      return;
    }

    next();
  };

export const videoMiddleware = {
    validateNewVideo: validate(availableFields.new),
    validateUpdateVideo: validate(availableFields.update)
}