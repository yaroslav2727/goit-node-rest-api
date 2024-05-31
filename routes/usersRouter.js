import express from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resendVerification,
  updateAvatar,
  updateSubscription,
  verifyUser,
} from "../controllers/usersControllers.js";
import {
  createUserSchema,
  loginUserSchema,
  requestVerificationEmailSchema,
  updateSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), registerUser);

usersRouter.get("/verify/:verificationToken", verifyUser);

usersRouter.post("/verify", validateBody(requestVerificationEmailSchema), resendVerification);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.get("/current", authenticate, getCurrentUser);

usersRouter.post("/logout", authenticate, logoutUser);

usersRouter.patch("/", authenticate, validateBody(updateSubscriptionSchema), updateSubscription);

usersRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

export default usersRouter;
