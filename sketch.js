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
            var color = playerAmountAsColor(cityData.bornHere);
            fill(color[0],color[1],color[2]);
            ellipse(pos.x, pos.y, 10, 10);
            console.log(cityData);
        }
    }
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

function playerAmountAsColor(playerArray){
    if(playerArray.length > 3 && playerArray.length <= 5){
        return [125,25,0];
    }
    else if (playerArray.length > 5 && playerArray.length < 10){
        return [215,50,0];
    }
    else if(playerArray.length >= 10){
        return [255,75,0];
    }
    else{
        return [85,0,0];
    }
}


// function mouseClicked(){
//     console.log(mouseX);
//     console.log(mouseY);
//     const position = map.pixelToLatlng(mouseX, mouseY);
//     console.log(position);
// }