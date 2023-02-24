const express = require("express");

const control = require("../../controllers/contacts");

<<<<<<< HEAD
const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
=======
const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contactsSchema");
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48

const router = express.Router();

router.get("/", control.getAll);

<<<<<<< HEAD
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

=======
router.get("/:contactId", control.getById);

router.post("/", validateBody(schemas.addSchema), control.addContact);

router.delete("/:contactId", control.deletedContactById);

router.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  control.updateContactById
);

>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
module.exports = router;
