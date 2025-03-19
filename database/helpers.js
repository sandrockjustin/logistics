import database from "./index.js";

/**
  model Items {
    id          Int         @id @default(autoincrement())
    UPC         String      @unique
    SKU         String
    name        String?
    description String?
    quantity    Int         @default(0)
    supplierId  Int
    supplier    Suppliers   @relation(fields: [supplierId], references: [id])
    Inventory   Inventory[]

    @@unique([SKU])
  }

  model Inventory {
    id        Int      @id @default(autoincrement())
    SN        String   @unique
    itemId    Int
    item      Items    @relation(fields: [itemId], references: [id])
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  model Suppliers {
    id    Int     @id @default(autoincrement())
    name  String
    valid Boolean @default(true)
    Items Items[]
  }
 */

const entries = {
  create: async (payload) => {

    try {
  
      const entry = await database.inventory.create({
        data: {
          SN: payload.SN,
          itemId: { connect: {SKU: payload.SN.split('-')[0]}},
        }
      })
  
      const updateQuantity = await database.items.update({
        where: {
          SKU: payload.SN.split('-')[0]
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      })
  
    } catch (error) {
      console.error(`Error creating new entry for SKU #${payload.SN.split('-')[0]}.`)
    }
  
  },
  read: async (payload) => {
    try {     
      const entries = await database.inventory.findMany({
        where: {
          SKU: payload.SKU
        }
      })

      return entries;
    } catch(error) {
      console.error(`Error reading SKU #${payload.SKU} entries.`)
    }
  },
  update: async (payload) => {
    try {

      const entries = await database.inventory.update({
        where: {
          SN: payload.SN
        }, 
        data: payload
      })    

    } catch(error) {
      console.error(`Error updating item SN #${payload.SN}.`)
      console.table(payload);
    }
  },
  delete: async (payload) => {
    try {
      const entry = await database.inventory.delete({
        where: { SN: payload.SN },
      })

      const updateQuantity = await database.items.update({
        where: {
          SKU: payload.SN.split('-')[0]
        },
        data: {
          quantity: {
            decrement: 1
          }
        }
      })

    } catch(error) {
      console.error(`Error deleting item SN #${payload.SN}.`)
    }
  },
}

const newSupplier = {
  create: async (payload) => {
    try {

      const supplier = await database.suppliers.create(payload);

    } catch (error) {
      console.error(`Error creating a new supplier record.`);
      console.table(payload);
    }
  }, 
  read: async (payload) => {
    try {

      let supplier;

      
      if (payload.requestInventory) {
        supplier = await database.suppliers.findFirst({
          where: { name: payload.name },
          include: {
            items: {
              inventory: true
            }
          }
        })
      } else if (payload.requestItems) {
        supplier = await database.suppliers.findFirst({
          where: { name: payload.name },
          include: {
            items: true
          }
        })
      } else {
        supplier = await database.suppliers.findFirst({
          where: { name: payload.name }
        })
      }

      return supplier;

    } catch (error) {
      console.error(`Error finding supplier ${payload.name}.`)
    }
  }, 
  update: async (payload) => {
    try {

      const supplierUpdated = await database.suppliers.update({
        where: { name: payload.name },
        data: payload
      })

    } catch (error) {
      console.error(`Error updating supplier ${payload.name}.`)
    }
  }, 
  delete: async (payload) => {
    try {

      const supplierDeleted = await database.suppliers.delete({
        where: { name: payload.name }
      })

    } catch (error) {
      console.error(`Error deleting supplier ${payload.name}.`)
    }
  }, 
};

const newItem =  {
  create: async (payload) => {
    try {

    } catch (error) {
      
    }
  }, 
  read: async (payload) => {
    try {

    } catch (error) {
      
    }
  }, 
  update: async (payload) => {
    try {

    } catch (error) {
      
    }
  }, 
  delete: async (payload) => {
    try {

    } catch (error) {
      
    }
  }, 
};