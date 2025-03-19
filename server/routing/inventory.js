import express from 'express';
import { inventory } from "../database/utilities/inventoryUtils.js";

const inventoryRouter = express.Router();

inventoryRouter.get('/', async (req, res) => {
  try {

    const data = await inventory.read(req.body.payload)

    if (!data) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

inventoryRouter.post('/', async (req, res) => {
  try {

    const data = await inventory.create(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(201).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

inventoryRouter.patch('/', async (req, res) => {
  try {

    const data = await inventory.update(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

inventoryRouter.delete('/', async (req, res) => {
  try {

    const data = await inventory.delete(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

export default inventoryRouter;