import HttpError from "../helpers/HttpError.js";

export const isEmptyBody = (req, _, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }
  next();
};
