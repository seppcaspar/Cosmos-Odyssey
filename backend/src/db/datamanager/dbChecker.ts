import { dbValidUntil, db, providers } from "../../db/schema"
import { validList } from "./dbValidList"
import { count, eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"


export const dbChecker = async () => {
    try {
        let oldest = await oldValidChecker()
      const ValidUntils = await db.select({ value: count() }).from(providers).where(eq(providers.validUntilID, oldest!));
      
    return ValidUntils[0].value
      

  
      
    } catch (error) {
      console.log(error)
    }

}