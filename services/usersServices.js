import User from "../models/User.js";
import { hashPassword } from "../helpers/hashFunctions.js";

export async function findUser(filterObj) {
  return User.findOne(filterObj);
}

export async function addUser(body) {
  const hashed = await hashPassword(body.password);
  return User.create({ ...body, password: hashed });
}

export async function updateUserById(userId, data) {
  return User.findByIdAndUpdate(userId, data);
}
