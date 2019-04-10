let teamColors;
let hockeyplayers;
let map;
let birthPlaces = [];
let birthPlacesTable;
const mappa = new Mappa('Leaflet');

const options = {
    lat: 0,
    lng: 0,
    zoom: 1.25,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function preload() {
    hockeyplayers = loadTable('/hockeydata.csv', 'header');
    teamColors = loadTable('/teamColorData.csv', 'header');
    cities = loadTable('/cityLatLng.csv', 'header');
}

function setup() {
    var canvas = createCanvas(640, 640);


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


}
/*
    Algorithm
    logic based
*/
function drawMarkers() {

    clear();
    for (var i = 0; i < cities.rows.length; i++) {
        var row = cities.rows[i];
        let homeTown = row.get('City');
        let homeCntry = row.get('Cntry');

        var cityData = findCity(homeTown, homeCntry);//Sub function 1

        if (map.map.getBounds().contains({
                lat: cityData.lat,
                lng: cityData.lng
            })) {
            const pos = map.latLngToPixel(cityData.lat, cityData.lng);
            var color = playerAmountAsColor(cityData.bornHere);
            fill(color[0], color[1], color[2]);
            ellipse(pos.x, pos.y, 10, 10);
            displayShownBirthplaces(cityData, i);//Sub function 2
            // console.log(cityData);
        } else {
            removeBirthPlace(i);
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

function playerAmountAsColor(playerArray) {
    if (playerArray.length > 3 && playerArray.length <= 5) {
        return [125, 25, 0];
    } else if (playerArray.length > 5 && playerArray.length < 10) {
        return [215, 50, 0];
    } else if (playerArray.length >= 10) {
        return [255, 75, 0];
    } else {
        return [85, 0, 0];
    }
}

function displayShownBirthplaces(homeCity, i) {
    var table = document.getElementById("dataTable");


    if (document.getElementById(i) === null) {
        table.insertRow(table.rows.length).outerHTML = "<tr id = " + i + "><td id = " + i + "> " + homeCity.name + "</td>" +
            "<td>" + formatPlayers(homeCity.bornHere) + "</td></tr>";
    }
}
/*
        Abstraction
Helps manage complexity by allowing me to draw a variable amount of players in the 
table.
*/
function formatPlayers(bornHere) {
    var playerCell = "";
    for (var i = 0; i < bornHere.length; i++) {
        var player = bornHere[i];
        var col = getTeamColor(player.Team);
        playerCell += "<span style = color:rgb(" + col[0] + "," + col[1] + "," + col[2] + ")> Name: " +
            player.FName + " " + player.LName + ", Birth Day: " + player.BDate + ", Team(s): " +
            player.Team + ", Position: " + player.Pos + "</span>\r\n";
    }
    return playerCell;
}

function removeBirthPlace(i) {


    var row = document.getElementById(i);
    if (document.getElementById(i) != null)
        row.outerHTML = "";

    
}

function getTeamColor(team) {
    
    var teamData = team;

    if (teamData.length > 3) {
        var teamArr = teamData.substr(teamData.lastIndexOf(" ") + 1,3);
        //teamArr.replace(" ","");
        teamData = teamArr;

    }
    var color;
    for (let row of teamColors.rows) {

        if (row.get('Team') == teamData) {
            color = [row.get('r'), row.get('g'), row.get('b')];
            return color;
        }
    }
}
