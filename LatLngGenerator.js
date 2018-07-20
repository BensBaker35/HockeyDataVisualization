var NodeGeocoder = require('node-geocoder');
var fs = require('fs');



var options1 = {
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


var geocoder = NodeGeocoder(options1);
var testcity = {
    name:"Naperville",
    stPv: "IL",
    cntry: "USA"
}

/*geocoder.geocode(testcity.name + ' ' + testcity.stPv + ' ' + testcity.cntry, function (err, res) {
    if (err)
        console.log(err);
    console.log(res[0].latitude);

});*/


fs.readFile('./hockeydata.csv', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    }
    var players = data.split("\n");

    var cities = [];

    players.forEach(function (player) {
        var playerdata = player.split(",");
        //console.log(playerdata);
        var cityLocation = {
            name: playerdata[1],
            stPv: playerdata[2],
            cntry: playerdata[3],
            lat: '',
            lng: ''
        }
        cities.push(cityLocation);



    })

    const set = new Set(cities.map(item => JSON.stringify(item)));
    const dedup = [...set].map(item => JSON.parse(item));
    cities = dedup;

    cities[0].lat = 'lat';
    cities[0].lng = 'lng';

    fs.writeFileSync('./cityLatLng.csv', cityAsString(cities.shift()),'utf-8', function(err){
        if(err)
            console.log(err);
    })
    cities.forEach(city =>{
        var cityPromise = new Promise((resolve,reject) => {
            geocoder.geocode(cityNameData(city),(err,data) =>{
                if(err)
                    console.log(err);
                
                console.log(data);
                console.log(city.name + " Lat Long: ", data[0].latitude, data[0].longitude);
                city.lat = data[0].latitude;
                city.lng = data[0].longitude;
                resolve(city);
            })
        })
        cityPromise.then(city =>{
            
            fs.appendFileSync('./cityLatLng.csv',cityAsString(city),'utf-8');
        })
        
       
    })
    
})


function cityAsString(city){
    return city.name + ',' + city.stPv 
    + ',' + city.cntry + ',' + city.lat + ',' + city.lng +'\r\n';
}
function cityNameData(city){
    return city.name + ',' + city.stPv + ',' + city.cntry;
}