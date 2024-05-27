import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import { comparePasswords } from "../helpers/hashFunctions.js";
import { createToken } from "../helpers/jwt.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await usersService.findUser({ email: req.body.email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const result = await usersService.addUser(req.body);
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
