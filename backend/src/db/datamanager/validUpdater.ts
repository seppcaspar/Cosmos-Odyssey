import { dbValidUntil, db } from "../../db/schema"
import { validList } from "./dbValidList"
import { eq } from "drizzle-orm"
import { Validator } from "./validator"
import { dbDropper } from "./dbDropper"
import { dbProvUpdater } from "./dbProvUpdater"
import { dbFetch } from "./dbFetch"
import { reservDropper } from "./reservDropper"


export const validUpdater = async () => {
    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    try {
        let dbValidList = await validList()
        const valid = await Validator()
        const lowest = dbValidList!.sort()[0]
        
        const newValidUntil = data.validUntil
        let field = {ValidUntil: newValidUntil}
        
        //checks if the latest validUntil in database is still valid
        if (valid?.dbValidUntil != valid?.newValidUntil) {

            //checks if it needs to add or update validUntil list
            if (dbValidList!.length == 15) {
                await dbDropper()
                await reservDropper()
                await db.update(dbValidUntil).set(field).where(eq(dbValidUntil.ValidUntil, lowest!));
            } else {
                await db.insert(dbValidUntil).values({
                    ValidUntil: newValidUntil
                })
            }
            await dbProvUpdater()

        }
        //sends provider list
        return dbFetch()



    } catch (error) {
        console.log(error)
    }

}