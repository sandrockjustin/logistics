import database from "./index.js";

export const inventory = {
  create: async (payload) => {

    try {
  
      const payloadSKU = payload.SN.split('-')[0];

      const entry = await database.inventory.create({
        data: {
          SN: payload.SN,
          itemId: { connect: {SKU: payloadSKU}},
        }
      })
  
      const updateQuantity = await database.items.update({
        where: {
          SKU: payloadSKU
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      })

      return entry;
  
    } catch (error) {
      console.error(`Error creating new entry for SKU #${payloadSKU}.`)
      throw error;
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
      throw error;
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

      return entries;

    } catch(error) {
      console.error(`Error updating item SN #${payload.SN}.`)
      console.table(payload);
      throw error;
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

      return entry;

    } catch(error) {
      console.error(`Error deleting item SN #${payload.SN}.`)
      throw error;
    }
  },
}

export const suppliers = {
  create: async (payload) => {
    try {

      const supplier = await database.suppliers.create(payload);

      return supplier;

    } catch (error) {
      console.error(`Error creating a new supplier record.`);
      console.table(payload);
      throw error;
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
      throw error;
    }
  }, 
  update: async (payload) => {
    try {

      const supplierUpdated = await database.suppliers.update({
        where: { name: payload.name },
        data: payload
      })

      return supplierUpdated;

    } catch (error) {
      console.error(`Error updating supplier ${payload.name}.`)
      throw error;
    }
  }, 
  delete: async (payload) => {
    try {

      const supplierDeleted = await database.suppliers.delete({
        where: { name: payload.name }
      })

      return supplierDeleted;

    } catch (error) {
      console.error(`Error deleting supplier ${payload.name}.`)
      throw error;
    }
  }, 
};

export const items =  {
  create: async (payload) => {
    try {

      const item = await database.items.create({
        data: {
          UPC: payload.UPC,
          SKU: payload.SKU,
          supplier: {connect: {id: payload.supplierId}}
        }
      })

      return item;

    } catch (error) {
      console.error(`Error creating new item UPC #${payload.UPC}.`)
      console.table(payload);
      throw error;
    }
  }, 
  read: async (payload) => {
    try {

      let items;

      if (payload.requestInventory){
        items = await database.items.findFirst({
          where: { SKU: payload.SKU },
          include: {
            inventory: true
          }
        })
      } else {
        items = await database.items.findFirst({
          where: { SKU: payload.SKU }
        })        
      }

      return items;

    } catch (error) {
      console.error(`Error fulfilling read request for SKU #${payload.SKU}.`)
      throw error;
    }
  }, 
  update: async (payload) => {
    try {

      const updatedItems = await database.items.update({
        where: {
          SKU: payload.SKU
        },
        data: payload
      })

      return updatedItems;

    } catch (error) {
      console.error(`Error updating item SKU #${payload.SKU}.`)
      throw error;
    }
  }, 
  delete: async (payload) => {
    try {

      const deletedItems = await database.items.delete({
        where: { SKU: payload.SKU}
      })

      return deletedItems;

    } catch (error) {
      console.error(`Error deleting item under SKU #${payload.SKU}.`)
      throw error;
    }
  }, 
};

