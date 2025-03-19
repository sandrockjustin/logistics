import database from "./index.js";

const newEntry = async () => {

  try {

    const entry = await database.inventory.create({
      
    })

  } catch (error) {
    console.error(`Error creating record with following details.`)
  }

}