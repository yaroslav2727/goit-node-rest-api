import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
}
