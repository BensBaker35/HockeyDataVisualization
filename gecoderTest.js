var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'mapquest',
    apiKey: 'PoJDKmnhD9enApfLWQUJydLGSgkF94lT',
    formatter: null
}

var options2 = {
    provider:'here',
    appId: 'rz0pTPqJroy1Dw6PLxhU',
    appCode:'3Euqa6ozuTxUcUE_CxVVAA',
    formatter: null
}

var geocoder = NodeGeocoder(options2);
var testCity = {
    name:"Naperville",
    stPv: "IL",
    cntry: "USA",
    lat: '',
    lng: ''
}

//geocoder.geocode(cityNameData(testCity),(err,data) => catch(data)).then(console.log(data));
//let temp2 = await temp.json;
console.log(temp2);


function cityAsString(city){
    return city.name + ',' + city.stPv 
    + ',' + city.cntry + ',' + city.lat + ',' + city.lng +'\r\n';
}
function cityNameData(city){
    return city.name + ',' + city.stPv + ',' + city.cntry;
}
