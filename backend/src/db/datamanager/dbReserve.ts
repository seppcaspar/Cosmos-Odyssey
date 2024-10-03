import { db, reservations } from "../../db/schema"
import { dbReserveCheck } from "./dbReserveCheck"
import { eq } from "drizzle-orm"
import { newValidChecker } from "./newValidChecker"


export const dbReserve = async (fields: any) => {
    try {
        const result = await dbReserveCheck(fields)
        
        if (result == "outdated")
            return {"status": "outdated"}
        if (result == "already exists")
            return {"status": "already exists"}
        let ID = result![0].id
        return await db.select().from(reservations).where(eq(reservations.firstName, fields.firstName)&&eq(reservations.lastName, fields.lastName))
    } catch (error) {
        console.log(error)
    }

}