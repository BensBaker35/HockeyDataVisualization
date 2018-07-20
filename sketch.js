let hockeyplayers;
let map;

const mappa = new Mappa('Leaflet');

const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
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

}

function draw() {



}

function drawMarkers() {
    
    clear();
    for (let row of hockeyplayers.rows) {
        let homeTown = row.get('City');
        let homeCntry = row.get('Cntry');
        //console.log(row);
        var cityData = findCity(homeTown, homeCntry);

        if (map.map.getBounds().contains({
                lat: cityData.lat,
                lng: cityData.lng
            })) {

            const pos = map.latLngToPixel(cityData.lat, cityData.lng);
            if (false) {

            } else {

                fill(255, 0, 0);
                ellipse(pos.x, pos.y, 10, 10);
                //console.log(cityData);
            }

        }

    }
}

function findCity(homeTown, hcntry) {
    for (let row of cities.rows) {
        var city = row.get('City');
        var cntry = row.get('Cntry');
        //console.log(city,cntry);
        if (city === homeTown && cntry === hcntry) {
            var latlng = {
                lat: row.get('lat'),
                lng: row.get('lng')
            }
            return latlng;
        }

    }
    throw new Error("Cant find " + homeTown + ", " + hcntry);
}


function getTeamColor(team) {
    switch (team) {
        case 'CHI':

            return (255, 0, 0);
            break;
        case 'VGK':

            return (10, 255, 255);
            break;
        default:
            return (0, 0, 255);
            break;
    }
}

// function mouseClicked(){
//     console.log(mouseX);
//     console.log(mouseY);
//     const position = map.pixelToLatlng(mouseX, mouseY);
//     console.log(position);
// }