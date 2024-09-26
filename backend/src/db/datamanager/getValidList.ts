import { dbValidUntil, db } from "../../db/schema"

export const getValidList = async () => {
    try {
        const selected = await db.select().from(dbValidUntil);
        return selected
    } catch (error) {
        console.log(error)
    }

}