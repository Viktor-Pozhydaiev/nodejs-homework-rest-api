const express = require("express");

const control = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  authentication,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authentication, control.getAll);

router.get("/:contactId", authentication, isValidId, control.getById);

router.post(
  "/",
  authentication,
  validateBody(schemas.addSchema),
  control.addContact
);

router.put(
  "/:contactId",
  isValidId,
  authentication,
  validateBody(schemas.addSchema),
  control.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authentication,
  validateBody(schemas.updateFavoriteSchema),
  control.updateStatusContact
);

router.delete(
  "/:contactId",
  authentication,
  isValidId,
  control.deletedContactById
);

router.get("/:contactId", authentication, control.getById);

router.post(
  "/",
  authentication,
  validateBody(schemas.addSchema),
  control.addContact
);

router.delete("/:contactId", authentication, control.deletedContactById);

router.put(
  "/:contactId",
  authentication,
  validateBody(schemas.updateSchema),
  control.updateContactById
);

module.exports = router;
