import express from 'express';
import { items } from "../database/utilities/itemUtils.js";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
  try {

    const data = await items.read(req.body.payload)

    if (!data) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

itemsRouter.post('/', async (req, res) => {
  try {

    const data = await items.create(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(201).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

itemsRouter.patch('/', async (req, res) => {
  try {

    const data = await items.update(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

itemsRouter.delete('/', async (req, res) => {
  try {

    const data = await items.delete(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

export default itemsRouter;