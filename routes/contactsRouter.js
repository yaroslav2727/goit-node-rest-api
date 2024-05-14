import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), updateContact);

export default contactsRouter;
