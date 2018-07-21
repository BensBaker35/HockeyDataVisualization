let hockeyplayers;
let map;
let birthPlaces = [];
const mappa = new Mappa('Leaflet');

const options = {
    lat: 0,
    lng: 0,
    zoom: 1.25,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function preload() {
    hockeyplayers = loadTable('/hockeydata.csv', 'header');
    cities = loadTable('/cityLatLng.csv', 'header');
}

function setup() {
    var canvas = createCanvas(640, 640);

    //background(100);

    map = mappa.tileMap(options);
    map.overlay(canvas);
    map.onChange(drawMarkers);

    for (let row of cities.rows) {
        var playersBornIn = getPlayersBornIn(row.get('City'), row.get('Cntry'));
        var birthPlace = {
            name: row.get('City'),
            stPv: row.get('Pr/St'),
            cntry: row.get('Cntry'),
            lat: row.get('lat'),
            lng: row.get('lng'),
            bornHere: playersBornIn
        }
        birthPlaces.push(birthPlace);
    }
    //console.log(birthPlaces);
}

// function draw() {
// }

function drawMarkers() {

    clear();
    for (let row of cities.rows) {

        let homeTown = row.get('City');
        let homeCntry = row.get('Cntry');

        var cityData = findCity(homeTown, homeCntry);

        if (map.map.getBounds().contains({
                lat: cityData.lat,
                lng: cityData.lng
            })) {
            const pos = map.latLngToPixel(cityData.lat, cityData.lng);
            fill(255, 0, 0);
            ellipse(pos.x, pos.y, 10, 10);
            console.log(cityData);
        }
    }
    // for (let row of hockeyplayers.rows) {
    //     let homeTown = row.get('City');
    //     let homeCntry = row.get('Cntry');
    //     //console.log(row);
    //     var cityData = findCity(homeTown, homeCntry);

    //     if (map.map.getBounds().contains({
    //             lat: cityData.lat,
    //             lng: cityData.lng
    //         })) {

    //         const pos = map.latLngToPixel(cityData.lat, cityData.lng);
    //         if (false) {

    //         } else {

    //             fill(255, 0, 0);
    //             ellipse(pos.x, pos.y, 10, 10);
    //             //console.log(cityData);
    //         }

    //     }

    // }
}

function findCity(homeTown, hcntry) {
    for (var i = 0; i < birthPlaces.length; i++) {
        var birthPlace = birthPlaces[i];
        if (birthPlace.name === homeTown && birthPlace.cntry === hcntry) {
            return birthPlace;
        }
    }
}


function getPlayersBornIn(city, cntry) {
    var playersBornHere = [];

    for (let row of hockeyplayers.rows) {
        if (row.get('City') === city && row.get('Cntry') === cntry) {
            var player = {
                LName: row.get('LN'),
                FName: row.get('FN'),
                Pos: row.get('Position'),
                Team: row.get('Team'),
                BDate: row.get('Born'),
                Nat: row.get('Nat')
            }
            playersBornHere.push(player);
        }
    }

    return playersBornHere;
}


// function mouseClicked(){
//     console.log(mouseX);
//     console.log(mouseY);
//     const position = map.pixelToLatlng(mouseX, mouseY);
//     console.log(position);
// }