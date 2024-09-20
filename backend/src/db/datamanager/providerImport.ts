import { providers, dbValidUntil, db } from "../../db/schema"
import { newValidChecker } from "./newValidChecker"


export const getnewdata = async () => {
    try {
        let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
        const response = await fetch(url)
        const data = await response.json()
        const ider = await newValidChecker()
        let validID = ider!
        var extractedValues: { id: number; 
            company: any; price: any; flightStart: any; flightEnd: any; routeID: number; ValidUntilID: number; }[] = [];
        var routeIDcounter = 0;
        var newidCounter = 1;
        data.legs.forEach(function (leg: { providers: any[] }) {
        
         routeIDcounter++
         
            leg.providers.forEach(function (provider: { company: { name: any }; price: any; flightStart: any; flightEnd: any }) {
                extractedValues.push({
                    id: newidCounter++,
                    company: provider.company.name,
                    price: provider.price,
                    flightStart: provider.flightStart,
                    flightEnd: provider.flightEnd,
                    routeID: routeIDcounter,
                    ValidUntilID: validID
                });
            });
        });
        return(extractedValues);



    } catch (error) {
        console.log(error)
    }
}