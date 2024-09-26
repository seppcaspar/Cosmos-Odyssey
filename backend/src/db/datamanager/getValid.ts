import { dbValidUntil, db } from "../../db/schema"
import { validList } from "./dbValidList"
import { eq, SQLWrapper } from "drizzle-orm"


export const getValid = async (ID: any) => {
    try {
        const selected = await db.select().from(dbValidUntil).where(eq(dbValidUntil.id, ID));
        return selected[0].ValidUntil
    } catch (error) {
        console.log(error)
    }

}