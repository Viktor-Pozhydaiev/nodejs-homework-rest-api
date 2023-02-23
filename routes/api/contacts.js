const express = require("express");

const control = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", control.getAll);

router.get("/:contactId", isValidId, control.getById);

router.post("/", validateBody(schemas.addSchema), control.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  control.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  control.updateStatusContact
);

router.delete("/:contactId", isValidId, control.deletedContactById);

module.exports = router;
