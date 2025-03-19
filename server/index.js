import express from 'express';
import database from './database/index.js';
import { inventory } from './routing/inventory.js';
import { suppliers } from './routing/suppliers.js';
import { items } from './routing/items.js';

const app = express();

app.use(express.json());
app.use('/api/inventory', inventory);
app.use('/api/suppliers', suppliers);
app.use('/api/items', items);



