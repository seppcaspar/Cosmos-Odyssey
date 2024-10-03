import { dbValidUntil, db } from "../../db/schema"

//gets all 15 validUntils from database
export const getValidList = async () => {
    try {
        const selected = await db.select().from(dbValidUntil);
        return selected
    } catch (error) {
        console.log(error)
    }
}