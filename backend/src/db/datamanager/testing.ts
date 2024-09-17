const jsonObject = require("./TravelPrices.json")

//console.log(jsonObject.legs[0].providers[0].company)

var typo = jsonObject["legs"]


const travelData = {
    "legs": 
        typo
    
};

let extractedValues: {
    newid: number; 
    company: any; price: any; flightStart: any; flightEnd: any;
}[] = [];

let newidCounter = 1;

typo.legs.forEach((leg: { providers: { company: { name: any; }; price: any; flightStart: any; flightEnd: any; }[]; }) => {
    leg.providers.forEach((provider: { company: { name: any; }; price: any; flightStart: any; flightEnd: any; }) => {
        extractedValues.push({
            newid: newidCounter++,  
            company: provider.company.name,
            price: provider.price,
            flightStart: provider.flightStart,
            flightEnd: provider.flightEnd
        });
    });
});

console.log(extractedValues);

/*
console.log(typo.length)
function typoJson(test){


    let object = {};
    for (let key of Object.keys(test)) { 
        for (let value of test[key]) { 
            object[key] = object[key] || []
            object[key].push(
                value['event']['ServiceOrder']['state']
            )
        }
     } 
    console.log(object)



    var myProviders = [];
    for (var i = 0, len = json.length; i < len; i++) {
      var item = json[i];
      if (item.id && item.name) {
        myProviders.push(item);
      }
      if (item.providers) {
        myProviders = myProviders.concat(typoJson(item.providers));
      }
    }
    console.log(myProviders)
};

typoJson(typo)
*/