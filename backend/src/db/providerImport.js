


async function getnewdata () {
    try {
        let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
        const response = await fetch(url)
        const data = await response.json()
        var extractedValues = [];
        var routeIDcounter = 0;
        var newidCounter = 1;
        data.legs.forEach(function (leg) {
        
         routeIDcounter++
         
            leg.providers.forEach(function (provider) {
                extractedValues.push({
                    id: newidCounter++,
                    company: provider.company.name,
                    price: provider.price,
                    flightStart: provider.flightStart,
                    flightEnd: provider.flightEnd,
                    routeID: routeIDcounter
                });
            });
        });
        return(extractedValues);



    } catch (error) {
        console.log(error)
    }
}