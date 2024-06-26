export const handleSaveError = (error, _, next) => {
  const { name, code } = error;
  console.log(name);
  console.log(code);
  error.status = 400;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  }
  next();
};

export function setUpdateOptions(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
}
