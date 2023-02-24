<<<<<<< HEAD
const { Contact } = require("../models/contact");

const { HttpError, contrWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await Contact.find();
=======
const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
<<<<<<< HEAD
  const result = await Contact.findById(contactId);
=======
  const result = await contacts.getContactById(contactId);
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

const addContact = async (req, res) => {
<<<<<<< HEAD
  const result = await Contact.create(req.body);
=======
  const result = await contacts.addContact(req.body);
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
<<<<<<< HEAD
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
=======
  const result = await contacts.updateContact(contactId, req.body);
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

<<<<<<< HEAD
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  } else {
    res.status(200).json(result);
  }
};

const deletedContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
=======
const deletedContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json({
<<<<<<< HEAD
=======
    deletedContact: result,
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
    message: "Deleted successfully",
  });
};

module.exports = {
<<<<<<< HEAD
  getById: contrWrapper(getById),
  getAll: contrWrapper(getAll),
  addContact: contrWrapper(addContact),
  deletedContactById: contrWrapper(deletedContactById),
  updateContactById: contrWrapper(updateContactById),
  updateStatusContact: contrWrapper(updateStatusContact),
=======
  getById: ctrlWrapper(getById),
  getAll: ctrlWrapper(getAll),
  addContact: ctrlWrapper(addContact),
  deletedContactById: ctrlWrapper(deletedContactById),
  updateContactById: ctrlWrapper(updateContactById),
>>>>>>> 4a1d49b758e041cb4bc30b251abfba9efe942e48
};
