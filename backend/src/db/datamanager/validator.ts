import { validList } from "./dbValidList"


export const Validator = async () => {
    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    try {
        const newValidUntil = data.validUntil
        let dbValidList = await validList()

        //checks if there exists any valids in database
        if (dbValidList!.length < 1) {
            dbValidList!.push(
                "nothing here xd"
            )
        }

        const highest = dbValidList!.reduce((a: any, b: any) => a! > b! ? a : b)
        const valid = {
            dbValidUntil: highest,
            newValidUntil: newValidUntil
        }

        //sends latest db validUntil and api validUntil
        return valid
    } catch (error) {
        console.log(error)
    }

}