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