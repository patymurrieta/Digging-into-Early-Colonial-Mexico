let mapMarkers = {};



function refreshGazetteerDataSet(){
    hideMarkers(getAllMarkersGazetteer());
    mapMarkers = {};

    const xhttp = new XMLHttpRequest();

    /*  xhttp.onload = function() {
          console.log(this.responseText);
      }
  */
    var toponymsFiltered = filterToponymsDuplicates(central);

    xhttp.open("POST", "https://colonialatlas.com/api/toponym",true);
console.log(JSON.stringify(toponymsFiltered));
    var formData = new FormData();
    formData.append("toponyms",JSON.stringify(toponymsFiltered));


    xhttp.onreadystatechange = function (aEvt){
        if (xhttp.readyState === 4) {
            if(xhttp.status === 200 || xhttp.status === 201) {
                showMap();
                let ann = JSON.parse(xhttp.responseText);
                console.log(ann);
                loadPointsOfGazetteer(ann);

            }
            else if(this.status === 500) {
                hideMap("Error 500: interno en el servidor","fa-exclamation-circle","fa-spinner");
                //console.log("Error interna con el servidor");
            }
            else if (this.status === 404) {
                hideMap("Page not founded,  error code:" + this.status,"fa-exclamation-circle","fa-spinner");
                //console.log("Página no encontrada");
            }
            else {
                hideMap("Error loading data, error code:" + this.status,"fa-exclamation-circle","fa-spinner");
                //console.log("Error loading page" + this.status);
            }

            bndRefreshGazetteer = true;
        }


    };

    hideMap("Searching toponyms from database","fa-spinner","fa-exclamation-circle")

    bndRefreshGazetteer = false;
    xhttp.send(formData);


}

function showMap(){
    document.getElementById("toponymsMessage").style.display="none";
    document.getElementById("mapid").style.display="flex";
    resizeMainWindow();
    document.getElementById("toponymsMessageContainer").style.display="none";

}

function hideMap(message,iconToShow, icontoHide){


    document.getElementById("toponymsMessage").style.display="block";
    document.getElementById("toponyms-icon").style.display = "block";
    $("#toponyms-icon").removeClass(icontoHide);
    $("#toponyms-icon").addClass(iconToShow);
    document.getElementById("toponymsMessage").innerHTML = message;

    document.getElementById("mapid").style.display="none";
    document.getElementById("toponymsMessageContainer").style.display="flex";
}

let bndRefreshGazetteer = true;

function RefreshGazetteer(){
    if(bndRefreshGazetteer)
            refreshGazetteerDataSet();
    else 
            alert("Please wait a moment...");

}

function loadGazetteerFile(e){
        let csvReader = new FileReader();
        let csvFile = e.target.files[0];

    csvReader.onload = (function(file){
        return function(e) {
            hideMarkers(getAllMarkersGazetteer());
            mapMarkers = {};

            refreshGazetteerDataSet();

            //loadPointsOfGazetteer(ann.features);
        }
    })(csvFile);
    csvReader.readAsText(csvFile);
}

function loadGazetteerFileCSV(e){
    let csvReader = new FileReader();
    let csvFile = e.target.files[0];

    csvReader.onload = (function(file){
        return function(e) {
            hideMarkers(getAllMarkersGazetteer());
            mapMarkers = {};
        parseCSV(e.target.result,"\n",",")

        }
    })(csvFile);
    csvReader.readAsText(csvFile);
}

function parseCSV(text, lineTerminator, cellTerminator) {
//break the lines apart
    var lines = text.split(lineTerminator);

    for(var j = 0; j<lines.length; j++){
        if(lines[j] !== ""){
//split the rows at the cellTerminator character
            var information = lines[j].split(cellTerminator);

            //createMarker(information[3],information[2],information[0],information[1],information[4].split(":"))
        }
    }

}


function createMarker(id,toponym,altitude,longitude,latitude,country, county,references,pages,volumen,tome,author) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    let dataMarker = setColorMarkerGazetteer(toponym);
    el.style.backgroundColor = dataMarker.color;


    if(dataMarker.key !== "UNKNOWN") {


        var marker = null;

        if(parseFloat(latitude) > -90.0 && parseFloat(latitude) < 90.0  && parseFloat(longitude) > -180.0 && parseFloat(longitude) < 180.0 ) {

            var types = [];

            // make a marker for each feature and add to the map
             marker = new mapboxgl.Marker(el)
                .setLngLat(new mapboxgl.LngLat(parseFloat(longitude), parseFloat(latitude)))
                .setPopup(new mapboxgl.Popup({offset: 10}).setHTML(
                    getPopUpToponym(toponym,latitude,longitude,country,country,references,pages,volumen,tome,author,"map"))
                );
             
        }else
            console.log("dato no permitido" + toponym + " lat:"+ latitude+ " lng:"+ longitude);

         if(marker!== null)
             marker.addTo(map);


         //registrar en el dataframe el tonoponimo
        addGazetteerPoint(id,toponym, latitude, longitude,country,county, dataMarker.key, "0.0", marker,types,references,pages,volumen,tome,author);
    }
}

/*Carga los toponimos de la consulta de la plataforma de gazetteer*/
function loadPointsOfGazetteer(jsonPoints) {
    asyncLoadGazetteerData(jsonPoints,0);
    /*
    jsonPoints.forEach(function (point) {

        createMarker(point.id,point.toponym,0.0,point.longitude,point.latitude,point.country,point.state,point["reference-title"],point.pages,point["reference-volume"],point["reference-tome"],point["reference-author"]);
    });

     */
}

function convertReferencesToHTMLTable(toponym){

    var htmlReferences = '';
    getReferencesByToponymName(toponym).forEach(function (reference){
        htmlReferences += getPopUpToponym(reference.keyWords,reference.latitude,reference.longitude,reference.country,reference.county,reference.reference,reference.pages,reference.volumen,reference.tome,reference.author,"table");
    });

    return htmlReferences;
}

function showMakersByKeyWords(keyWords) {


    getAllMarkersGazetteer().filter(function (maker){
       if( $.inArray(maker.keyWords.toLowerCase(),keyWords) !== -1)
       {
           showMarker(maker);
           return true;
       }
    });

}

function showPopupOfMarker(keyword){

    getAllMarkersGazetteer().filter(function (maker){//se hace un filtro en todos los toponimos
        if( maker.keyWords.toLowerCase().includes(keyword.toLowerCase()))//si los nombres coinciden
        {
            map.flyTo({//se manda la animación a las coordenadas del toponimo encontrado
                center:new mapboxgl.LngLat(parseFloat(maker.longitude), parseFloat(maker.latitude)),
                zoom: 14//se hace zooom de 5 a 18 siendo 18 lo mas cercano
            });

            createPopupinMap(maker);//crea y muestra el popup con la información del toponimo
            return true;
        }
    });
}


let popup=null;

function createPopupinMap(marker){
    if(popup!=null)
        popup.remove();
     popup = new mapboxgl.Popup()
        .setLngLat([parseFloat(marker.longitude), parseFloat(marker.latitude)])
        .setHTML(getPopUpToponym(marker.keyWords,marker.latitude,marker.longitude,marker.country,marker.county,marker.reference,marker.pages,marker.volumen,marker.tome,marker.author,"map"))
        .addTo(map);

}

function getPopUpToponym(toponym,latitude,longitude,country,state,book,pages,volume,tome,author,type){

    if(type === "map") {


        return '<div id="" class="col-md-12 p-0 m-0 toolContainer  mr-2">' +
            '<div class=" row wrapper ">' +
            '<p class="title-toponym">' + toponym + ' </p>' +
            '<div class="title-line mb-2 ml-0"></div>' +
            '</div>' +
            '<div class=" row wrapper ">' +
            '<div class="col-sm-12">' +
            '<p class="subtitle-toponym">Book</p>' +
            '<p class="toponym-latlng">' + book + '</p> ' +
            '</div> ' +
            '<div class="col-sm-6">' +
            '<p class="subtitle-toponym">Volume</p>' +
            '<p class="toponym-latlng">' + volume + '</p>  ' +

            '</div> ' +
            '<div class="col-sm-6">' +
            '<p class="subtitle-toponym">Tome</p> ' +
            '<p class="toponym-latlng">' + tome + '</p>  ' +

            '</div> ' +
            '<div class="col-sm-12">' +
            '<p class="subtitle-toponym">Pages</p>' +
            '<p class="toponym-latlng">' + pages + '</p>  ' +

            '</div> ' +
            '<div class="col-sm-6">' +
            '<p class="subtitle-toponym">Latitude</p>' +
            '<p class="toponym-latlng">' + latitude + '</p>  ' +
            '<p class="subtitle-toponym">Country</p> ' +
            '<p class="toponym-latlng">' + country + '</p>  ' +

            '</div> ' +
            '<div class="col-sm-6"> ' +
            '<p class="subtitle-toponym">Longitude</p>' +
            '<p class="toponym-latlng">' + longitude + '</p>  ' +
            '<p class="subtitle-toponym">State</p> ' +
            '<p class="toponym-latlng">' + state + '</p>  ' +
            '</div> ' +
            '<button type="button" toponym="' + toponym + '" onClick="searchAnnotationMatches(this)" class="button-search"' +
            ' >Search matches</button>' +
            '<div class="line-full my-2"></div>' +
            '</div>' +
            '</div>';
    }else
    {
        return '<div id="" class="col-md-12 p-0 m-0 toolContainer  mr-2">' +

            '<div class=" row wrapper ">' +
                '<div class="col-sm-12">' +
                '<p class="subtitle-toponym-table">Book</p>' +
                '<p class="annotation-information-details">' + book + '</p> ' +
            '</div> ' +
            '<div class="col-sm-3">' +
            '<p class="subtitle-toponym-table">Toponym</p>' +
            '<p class="annotation-information-details">' + toponym + '</p>  ' +
            '</div> ' +
            '<div class="col-sm-3">' +
                '<p class="subtitle-toponym-table">Volume</p>' +
                '<p class="annotation-information-details">' + volume + '</p>  ' +
            '</div> ' +
            '<div class="col-sm-3">' +
                '<p class="subtitle-toponym-table">Tome</p> ' +
                '<p class="annotation-information-details">' + tome + '</p>  ' +
            '</div> ' +
            '<div class="col-sm-3">' +
            '<p class="subtitle-toponym-table">Author</p> ' +
            '<p class="annotation-information-details">' + author + '</p>  ' +
            '</div> ' +

            '<div class="col-sm-6">' +
                '<p class="subtitle-toponym-table">Latitude</p>' +
                '<p class="annotation-information-details">' + latitude + '</p>  ' +
                '<p class="subtitle-toponym-table">Country</p> ' +
                '<p class="annotation-information-details">' + country + '</p>  ' +
            '</div> ' +
            '<div class="col-sm-6"> ' +
                '<p class="subtitle-toponym-table">Longitude</p>' +
                '<p class="annotation-information-details">' + longitude + '</p>  ' +
                '<p class="subtitle-toponym-table">State</p> ' +
                '<p class="annotation-information-details">' + state + '</p>  ' +
            '</div> ' +
            '<div class="col-sm-12">' +
            '<p class="subtitle-toponym-table">Pages</p>' +
            '<p class="annotation-information-details">' + pages + '</p>  ' +
            '</div> ' +
            '<div class="line-full my-2"></div>' +

            '</div>' +
            '</div>';
    }
}

function hideMarkers(arrayOfMarkers) {
    $.each(arrayOfMarkers, function (index, annotation) {

        if(annotation["activate"] && annotation["marker"] !== null) {

            annotation["marker"].remove();
            annotation["activate"]= false;
        }
    });
}

function showMarkers(arrayOfMarkers) {
    $.each(arrayOfMarkers, function (index, annotation) {
        showMarker(annotation);
    });
}

function showMarker(gazetteerPoint){
    if(!gazetteerPoint["activate"] && gazetteerPoint["marker"] !== null) {
        gazetteerPoint["marker"].addTo(map);
        gazetteerPoint["activate"]= true;
    }
}

function findCoincidencesInGazetteer(toponyms) {
   hideMarkers(getAllMarkersGazetteer());
   //showMakersByKeyWords(filterAnnotations(toponyms));
    showMakersByKeyWords(toponyms);
}

function filterAnnotations(annotations) {
    var index = [];
    annotations.forEach(function (uniqueAnnotation) {
        if(index.filter(function (uniqueAnnotationInList) {
            return uniqueAnnotationInList === uniqueAnnotation.label;
        }).length === 0)
            index.push(uniqueAnnotation.label);
    });

    return index;
}

async function asyncLoadGazetteerData(dataSet,start){

    let setNumber = 100;
    const  result = await appendGazetteerPoint(dataSet,start,setNumber);


    if(result !== "END") {
        //$("#coincidences-export").html(result);
        start++;
        asyncLoadGazetteerData(dataSet, start);
    }else
    {

        //$("#coincidences-export").html(dataSet.length + " Coincidences");
    }

}

function appendGazetteerPoint(dataSet,start,setNumber){

    return new Promise(resolve => {
        setTimeout(() => {
            let setToDisplay = start * setNumber;

            if(setToDisplay <= dataSet.length){
                if(start === 1){
                    dataSet.slice(0,setNumber).forEach(function (point){
                        createMarker(point.id,point.toponym,0.0,point.longitude,point.latitude,point.country,point.state,point["reference-title"],point.pages,point["reference-volume"],point["reference-tome"],point["reference-author"]);
                    });
                }
                else {
                    dataSet.slice(setToDisplay-setNumber,setToDisplay).forEach(function (point){
                        createMarker(point.id,point.toponym,0.0,point.longitude,point.latitude,point.country,point.state,point["reference-title"],point.pages,point["reference-volume"],point["reference-tome"],point["reference-author"]);
                    });
                }

                resolve("Progress => "+parseInt((setToDisplay/dataSet.length)*100) + "%");
            }
            else {

                dataSet.slice(setToDisplay-setNumber,dataSet.length).forEach(function (point){
                    createMarker(point.id,point.toponym,0.0,point.longitude,point.latitude,point.country,point.state,point["reference-title"],point.pages,point["reference-volume"],point["reference-tome"],point["reference-author"]);

                });

                resolve("END");
            }
        },200);
    });
}