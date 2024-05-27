import Contact from "../models/Contacts.js";

export function listContacts(filter = {}, paginationSettings = {}) {
  return Contact.find(filter, "", paginationSettings);
}

export function getContactByFilter(filter) {
  return Contact.findOne(filter);
}

export async function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

export function addContact(body) {
  return Contact.create(body);
}

export function updateContact(filter, body) {
  return Contact.findOneAndUpdate(filter, body);
}

export function updateStatusContact(filter, body) {
  return Contact.findOneAndUpdate(filter, body);
}
