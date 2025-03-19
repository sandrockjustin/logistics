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