import { dbValidUntil, db } from "../../db/schema"

//gets validUntil list from database
export const validList = async () => {
    try {
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