import { dbValidUntil, db } from "../../db/schema"
import { validList } from "./dbValidList"
import { UpdateThing } from "./updater"
import { eq } from "drizzle-orm"
import { Validator } from "./validator"
import { getnewdata } from "./providerImport"
import { dbDropper } from "./dbDropper"
import { dbProvUpdater } from "./dbProvUpdater"
import { dbFetch } from "./dbFetch"


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
        
        if (valid?.dbValidUntil != valid?.newValidUntil) {

            if (dbValidList!.length == 15) {
                await dbDropper()
                await db.update(dbValidUntil).set(field).where(eq(dbValidUntil.ValidUntil, lowest!));
            } else {
                await db.insert(dbValidUntil).values({
                    ValidUntil: newValidUntil
                })
            }
            await dbProvUpdater()

        }
        return dbFetch()



    } catch (error) {
        console.log(error)
    }

}