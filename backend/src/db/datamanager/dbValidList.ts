import { dbValidUntil, db } from "../../db/schema"


export const validList = async () => {
    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    try {
        const newValidUntil = data.validUntil
        const ValidUntils = await db.select().from(dbValidUntil)
        let dbValids = []
        
        for (var i = 0, len = ValidUntils.length; i < len; i++) {
            var item = ValidUntils[i].ValidUntil
            dbValids.push(item)
        }
        return dbValids
    } catch (error) {
        console.log(error)
    }

}