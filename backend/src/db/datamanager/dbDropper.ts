import { providers, db } from "../../db/schema"
import { eq } from "drizzle-orm"
import { dbChecker } from "./dbChecker"
import { oldValidChecker } from "./oldValidChecker"

//deletes providers that have expired pricelists
export const dbDropper = async () => {
    try {
        const lowest = await oldValidChecker()
        let existe = await dbChecker()

        if (existe != 0) {
            await db.delete(providers).where(eq(providers.validUntilID, lowest!));
        }

    } catch (error) {
        console.log(error)
    }
}