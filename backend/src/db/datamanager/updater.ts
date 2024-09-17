import { dbValidUntil, db } from "../../db/schema"


export const UpdateThing = async () => {
    try {
        let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
        const response = await fetch(url)
        const data = await response.json()
        const newValidUntil = data.validUntil
        await db.insert(dbValidUntil).values({

            ValidUntil: newValidUntil
        }
        );





    } catch (error) {
        console.log(error)
    }
}