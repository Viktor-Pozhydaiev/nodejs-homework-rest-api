const contrWrapper = (ctrl) => {
  const tryFunc = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return tryFunc;
};

module.exports = contrWrapper;
