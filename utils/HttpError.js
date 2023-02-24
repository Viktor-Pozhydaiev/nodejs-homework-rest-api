const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
<<<<<<< HEAD

=======
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
module.exports = HttpError;
