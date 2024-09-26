import { providers, dbValidUntil, db } from "../../db/schema"
import { eq } from "drizzle-orm"
import { Validator } from "./validator"
import { validList } from "./dbValidList"
import { dbChecker } from "./dbChecker"
import { oldValidChecker } from "./oldValidChecker"

export const dbDropper = async () => {
    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    try {
        let dbValidList = await validList()
        const valid = await Validator()
        const lowest = await oldValidChecker()
        let existe = await dbChecker()
        const newValidUntil = data.validUntil
        let field = { ValidUntil: newValidUntil }

        if (existe != 0) {


            await db.delete(providers).where(eq(providers.validUntilID, lowest!));

        }




    } catch (error) {
        console.log(error)
    }

}