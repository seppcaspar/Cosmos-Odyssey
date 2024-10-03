import { dbValidUntil, db, providers, reservations } from "../../db/schema"
import { validList } from "./dbValidList"
import { count, eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"


export const reservChecker = async () => {
    try {
        let oldest = await oldValidChecker()
      const ValidUntils = await db.select({ value: count() }).from(reservations).where(eq(reservations.validUntilID, oldest!));
      
    return ValidUntils[0].value
      

  
      
    } catch (error) {
      console.log(error)
    }

}