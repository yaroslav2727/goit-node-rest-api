import multer from "multer";
import path from "path";

import HttpError from "../helpers/HttpError.js";

const ALLOWED_EXTENTIONS = ["jpg", "png", "gif"];

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const arr = file.originalname.split(".");
    const extension = arr[arr.length - 1];
    const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}.${extension}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, callback) => {
  const arr = file.originalname.split(".");
  const extension = arr[arr.length - 1];

  if (!ALLOWED_EXTENTIONS.includes(extension)) {
    return callback(HttpError(400, `Only ${ALLOWED_EXTENTIONS} are allowed`));
  }

  callback(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
