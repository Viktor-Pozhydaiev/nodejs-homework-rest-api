const express = require("express");

const control = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", control.getAll);

router.get("/:contactId", control.getById);

router.post("/", validateBody(schemas.addSchema), control.addContact);

router.delete("/:contactId", control.deletedContactById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  control.updateContactById
);

module.exports = router;
