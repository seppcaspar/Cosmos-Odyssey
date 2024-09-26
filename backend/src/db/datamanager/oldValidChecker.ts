import { dbValidUntil, db } from "../../db/schema"
import { validList } from "./dbValidList"
import { eq } from "drizzle-orm"


export const oldValidChecker = async () => {
    try {
        let dbValidList = await validList()
        const lowest = dbValidList!.sort()[0]
        const ValidUntils = await db.select().from(dbValidUntil).where(eq(dbValidUntil.ValidUntil, lowest!));
        return ValidUntils[0].id
    } catch (error) {
        console.log(error)
    }

}