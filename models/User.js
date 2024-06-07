import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks.js";
import { VALID_SUBSCRIPTIONS, DEFAULT_SUBSCRIPTION } from "../constants/userConstants.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: VALID_SUBSCRIPTIONS,
      default: DEFAULT_SUBSCRIPTION,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          return typeof value === "string" || value === null;
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
