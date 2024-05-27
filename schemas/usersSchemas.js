import Joi from "joi";
import { VALID_SUBSCRIPTIONS } from "../constants/userConstants.js";

export const createUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(...VALID_SUBSCRIPTIONS),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...VALID_SUBSCRIPTIONS)
    .required(),
});
