
let hockeyplayers;
let map;

const mappa = new Mappa('Leaflet');

const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function preload(){
    hockeyplayers = loadTable('/hockeydata.csv', 'header');
    cities = loadTable('/cityLatLng.csv','header');
}

function setup(){
    canvas = createCanvas(640,640);
    
    
    for(let row of hockeyplayers.rows){
        let homeTown = row.get('City');
        findCity(homeTown);
        
    }
    //background(100);

    map = mappa.tileMap(options);
    map.overlay(canvas);
    //map.onChange(drawMarkers);

}

function draw(){
    clear();
    const pos = map.latLngToPixel(42.3016,-71.0676);
    fill(255,0,0);
    ellipse(pos.x,pos.y,5,5);

}
function drawMarkers(){
    
}

function findCity(homeTown){
    for(let col of cities.getColumn('City')){
        if(col === homeTown){
            console.log('Found City: ', col);
            return col;
        }
    }
}