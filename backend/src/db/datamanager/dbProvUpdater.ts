import { dbValidUntil, db, providers } from "../../db/schema"
import { validList } from "./dbValidList"
import { count, eq } from "drizzle-orm"
import { oldValidChecker } from "./oldValidChecker"
import { getnewdata } from "./providerImport"
import { Validator } from "./validator"


export const dbProvUpdater = async () => {
    try {
        const valid = await Validator()

        let newdata = await getnewdata()
        await db.insert(providers).values(newdata!);










    } catch (error) {
        console.log(error)
    }

}