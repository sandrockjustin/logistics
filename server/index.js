import express from 'express';
import database from './database/index.js';
import inventoryRouter from './routing/inventory.js';
import supplierRouter from './routing/suppliers.js';
import itemsRouter from './routing/items.js';

const app = express();

app.use(express.json());
app.use('/api/inventory', inventoryRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/items', itemsRouter);


app.listen(3000, () => {
  console.log(`→ Express is listening on port 3000....`)
})