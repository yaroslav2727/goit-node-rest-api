import Contact from "../models/Contacts.js";

export function listContacts() {
  return Contact.find();
}

export function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function addContact(body) {
  return Contact.create(body);
}

export function updateContact(contactId, body) {
  return Contact.findByIdAndUpdate(contactId, body);
}

export function updateStatusContact(contactId, body) {
  return Contact.findByIdAndUpdate(contactId, body);
}
