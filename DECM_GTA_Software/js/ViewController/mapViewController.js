
var bndMapUpdating =false;
var arraySelectedByMap = [];

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-100.9878424, 22.1480983],
    zoom: 3,
    minZoom: 3,
    maxZoom: 18
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

map.setStyle('mapbox://styles/mapbox/light-v10');//se lanza el light por defecto


const nav = new mapboxgl.NavigationControl({
    showCompass: false
});

$('#mapid').mousedown(function(e){
    bndMapMouseUp = false;
    console.log(" Se dio mousedown");
});

$('#mapid').mouseup(function(e){
    /*if(arraySelectedByMap.length>0)
    {
        keywords = arraySelectedByMap;
        executeQueryByCoords();
    }
    console.log(arraySelectedByMap);*/
});


map.addControl(nav, 'top-left');


// MapboxGL Draw
const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true,
    },
    modes: {
        ...MapboxDraw.modes,
        'draw_rectangle_drag': mapboxGLDrawRectangleDrag
    }
});

map.addControl(draw,'top-right');

map.on('draw.create',updateArea);
map.on('draw.delete',updateArea);
map.on('draw.update',updateArea);

//draw.changeMode('draw_rectangle_drag');


function updateArea(e) {
    var data = draw.getAll();
    arraySelectedByMap = [];
    if(data.features.length >0){
        $.each(data.features, function (index,polygon) {

            $.each(getAllMarkersGazetteer(), function(indexPoint, gazetteerPoint){
                var pt = turf.point([gazetteerPoint.longitude,gazetteerPoint.latitude]);
                var poly = turf.polygon(polygon.geometry.coordinates);
                var bnd = turf.booleanPointInPolygon(pt,poly);
                if(bnd && gazetteerPoint.activate){
                    arraySelectedByMap.push(gazetteerPoint.keyWords);
                }
            });
        });
    }
}

//Cambio de estilo del mapa
function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);


}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function cleanPolygons(){

}

function setColorMarkerGazetteer(name) {
    var query = {
        key: "",
        color: ""
    };
    let coincidencesKeyWords = central.filter((annotation) => annotation["label"].toLowerCase() === name.toLowerCase());
    if(coincidencesKeyWords.length == 0) {
        query.key = "UNKNOWN";
        query.color = "hsl(0,100,0)";
        return query;
    }else{
        query.key = coincidencesKeyWords[0]["key"];
        query.color = coincidencesKeyWords[0]["color"];// "hsl(0,100%,72%)";
        return query;
    }
}


