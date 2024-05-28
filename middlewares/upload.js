import multer from "multer";
import path from "path";

import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}.${extension}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();
  if (extension !== "jpg" && extension !== "png") {
    return callback(HttpError(400, "Only .jpg and .png are allowed"));
  }
  callback(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
