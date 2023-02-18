const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return console.log(contacts);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found!`);
    }
    return console.log(contact);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const findIdx = contacts.findIndex((item) => item.id === contactId);
  if (findIdx === -1) {
    return null;
  }
  const deletedContact = contacts.filter((_, index) => index !== findIdx);

  await fs.writeFile(contactsPath, JSON.stringify(deletedContact));
  return console.log(contacts[findIdx]);
};

const addContact = async (body) => {
  const newContact = {
    id: v4(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return console.log(newContact);
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const findIdx = contacts.findIndex((item) => item.id === contactId);
  if (findIdx === -1) {
    return null;
  }
  contacts[findIdx] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
