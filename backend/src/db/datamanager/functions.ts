
import { dbValidUntil, db } from "../../db/schema"


export const Validator = async () => {
    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    try {
      const newValidUntil = data.validUntil
      const ValidUntils = await db.select().from(dbValidUntil)
      const oldValidUntil = ValidUntils.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)
  
      
      const valid = {
        dbValidUntil: (oldValidUntil).ValidUntil,
        newValidUntil: newValidUntil 
      }
  
      return valid
    } catch (error) {
      console.log(error)
    }

}