import { db, providers } from "../../db/schema"
import { count, eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"

//checks if providers exist
export const dbChecker = async () => {
  try {
    let oldest = await oldValidChecker()
    const ValidUntils = await db.select({ value: count() }).from(providers).where(eq(providers.validUntilID, oldest!));

    return ValidUntils[0].value
  } catch (error) {
    console.log(error)
  }
}