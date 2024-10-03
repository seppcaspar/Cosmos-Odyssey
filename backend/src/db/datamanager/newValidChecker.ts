import { dbValidUntil, db } from "../../db/schema"
import { validList } from "./dbValidList"
import { eq } from "drizzle-orm"

//checks for the latest validUntil in database
export const newValidChecker = async () => {
    try {
        let dbValidList = await validList()
        const highest = dbValidList!.reduce((a: any, b: any) => a! > b! ? a : b)
        const ValidUntils = await db.select().from(dbValidUntil).where(eq(dbValidUntil.ValidUntil, highest!));
        return ValidUntils[0].id
    } catch (error) {
        console.log(error)
    }

}