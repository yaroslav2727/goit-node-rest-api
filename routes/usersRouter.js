import express from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateSubscription,
} from "../controllers/usersControllers.js";
import {
  createUserSchema,
  loginUserSchema,
  updateSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";
import { authenticate } from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), registerUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.get("/current", authenticate, getCurrentUser);

usersRouter.post("/logout", authenticate, logoutUser);

usersRouter.patch("/", authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

export default usersRouter;
