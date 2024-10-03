import { db, reservations } from "../../db/schema"
import { dbReserveCheck } from "./dbReserveCheck"
import { eq } from "drizzle-orm"

//checks if it can reserve, returns customers reserved providerIDs
export const dbReserve = async (fields: any) => {
    try {
        const result = await dbReserveCheck(fields)
        if (result == "outdated")
            return {"status": "outdated"}
        if (result == "already exists")
            return {"status": "already exists"}
        return await db.select().from(reservations).where(eq(reservations.firstName, fields.firstName)&&eq(reservations.lastName, fields.lastName))
    } catch (error) {
        console.log(error)
    }
}