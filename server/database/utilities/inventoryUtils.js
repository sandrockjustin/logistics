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