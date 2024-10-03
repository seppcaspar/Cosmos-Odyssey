import { db, providers } from "../../db/schema"
import { getnewdata } from "./providerImport"

//inserts new providers into database
export const dbProvUpdater = async () => {
    try {
        let newdata = await getnewdata()
        await db.insert(providers).values(newdata!);

    } catch (error) {
        console.log(error)
    }
}