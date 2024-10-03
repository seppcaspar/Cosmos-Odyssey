import { db, reservations } from "../../db/schema"
import { eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"

//deletes expired reservations
export const reservDropper = async () => {
    try {
        const lowest = await oldValidChecker()
        await db.delete(reservations).where(eq(reservations.validUntilID, lowest!));
    } catch (error) {
        console.log(error)
    }
}