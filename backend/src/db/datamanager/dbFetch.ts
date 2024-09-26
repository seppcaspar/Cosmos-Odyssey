import { dbValidUntil, db, providers } from "../../db/schema"
import { validList } from "./dbValidList"
import { count, eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"


export const dbFetch = async () => {
    try {
        
      
    return await db.select().from(providers);
      

  
      
    } catch (error) {
      console.log(error)
    }

}