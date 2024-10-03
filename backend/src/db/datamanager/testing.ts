import { db, reservations } from "../../db/schema"

import { newValidChecker } from "./newValidChecker"


export const testing = async (fields: any) => {
    try {
        let result = await db.select().from(reservations)
        let valid = await newValidChecker()
        var includes = false
        for (var i = 0, len = result.length; i < len; i++) {
            var item = result[i]
            if (fields.validUntilID == valid) {
                if (item.providerID == fields.providerID && item.lastName == fields.lastName && item.firstName == fields.firstName) {
                    var includes = true;
                }
            } else {
                return "outdated"
            }
        }
        if (includes == true) {

            return "already exists"
        } else {
            return "good to go"
        }





    } catch (error) {
        console.log(error)
    }

}