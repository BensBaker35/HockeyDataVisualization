
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
}

function setup(){
    canvas = createCanvas(640,640);
    
    /*
    for(let row of hockeyplayers.rows){
        let team = row.get('Team');
        
        if(team.indexOf("VGK") != -1){
            let name = row.get('FN') + " " + row.get('LN');
        console.log(name);
        } 
    }*/
    //background(100);

    map = mappa.tileMap(options);
    map.overlay(canvas);

}

function draw(){
    clear();


}
