var jsonObject = require("./TravelPrices.json");
//console.log(jsonObject.legs[0].providers[0].company)
var typo = jsonObject["legs"];
var travelData = {
    "legs": typo
};
var extractedValues = [];
var routeIDcounter = 0;
var newidCounter = 1;
jsonObject.legs.forEach(function (leg) {

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
