import express from 'express';
import { suppliers } from "../database/utilities/supplierUtils.js";

const supplierRouter = express.Router();

supplierRouter.get('/', async (req, res) => {
  try {

    const data = await suppliers.read(req.body.payload)

    if (!data) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

supplierRouter.post('/', async (req, res) => {
  try {

    const data = await suppliers.create(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(201).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

supplierRouter.patch('/', async (req, res) => {
  try {

    const data = await suppliers.update(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

supplierRouter.delete('/', async (req, res) => {
  try {

    const data = await suppliers.delete(req.body.payload);

    if (!data) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }

  } catch (error) {
    res.sendStatus(500);
  }
})

export default supplierRouter;