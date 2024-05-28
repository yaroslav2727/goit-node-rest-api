import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import Jimp from "jimp";

import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import { comparePasswords } from "../helpers/hashFunctions.js";
import { createToken } from "../helpers/jwt.js";

const publicPath = path.resolve("public");

export const registerUser = async (req, res, next) => {
  try {
    const user = await usersService.findUser({ email: req.body.email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(req.body.email, { d: "retro" });
    const result = await usersService.addUser({ ...req.body, avatarURL });
    const { email, subscription } = result;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const isCorrectPassword = await comparePasswords(password, user.password);
    if (!isCorrectPassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    const token = createToken({ id: user._id });
    await usersService.updateUserById(user._id, { token });
    res.json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await usersService.updateUserById(_id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { _id, email } = req.user;
    const newUser = await usersService.updateUserById(_id, req.body);
    res.json({ email, subscription: newUser.subscription });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file attached");
    }

    const { _id, avatarURL: oldAvatarURL } = req.user;

    const { path: oldPath, filename } = req.file;

    const newPath = path.join(publicPath, "avatars", filename);

    try {
      const image = await Jimp.read(oldPath);
      image.resize(250, 250).write(newPath);
    } catch (error) {
      throw HttpError(400, `Could not read file. ${error.message}`);
    } finally {
      await fs.unlink(oldPath);
    }

    if (oldAvatarURL.includes("avatars")) {
      const oldAvatarPath = path.join(publicPath, oldAvatarURL);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {}
    }

    const avatarURL = path.join("/avatars", filename);

    const newUser = await usersService.updateUserById(_id, { avatarURL });

    res.json({ avatarURL: newUser.avatarURL });
  } catch (error) {
    next(error);
  }
};
