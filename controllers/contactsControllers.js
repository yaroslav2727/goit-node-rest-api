import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { buildFilter } from "../helpers/buildFilter.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const paginationSettings = { skip, limit };
    const filter = buildFilter(req.query, ["name", "email", "phone", "favorite"]);
    filter.owner = owner;
    const result = await contactsService.listContacts(filter, paginationSettings);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.getContactByFilter({ _id: req.params.id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact({ _id: req.params.id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.updateContact({ _id: req.params.id, owner }, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.updateContact(
      {
        _id: req.params.id,
        owner,
      },
      req.body
    );
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
