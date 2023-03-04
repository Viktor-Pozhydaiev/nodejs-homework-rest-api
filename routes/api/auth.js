const express = require("express");

const router = express.Router();

const { validateBody, authentication } = require("../../middlewares");

const { schemas } = require("../../models/user");

const contr = require("../../controllers/auth");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  contr.register
);
router.post("/users/login", validateBody(schemas.loginSchema), contr.login);

router.get("/users/current", authentication, contr.getCurrent);

router.post("/users/logout", authentication, contr.logOut);

module.exports = router;
