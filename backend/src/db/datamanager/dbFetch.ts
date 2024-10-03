import { db, providers } from "../../db/schema"

//gets providers from database
export const dbFetch = async () => {
    try {
    return await db.select().from(providers);
    } catch (error) {
      console.log(error)
    }
}