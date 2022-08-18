resizeMainWindow();
window.addEventListener('resize', resizeMainWindow);

bndNotAllLabels = false;


function resizeMainWindow(){

    var heightContainerDashboard = $('#containerDashboard').height();
    var unitheight = heightContainerDashboard/10

    $('#containerTitle').height(unitheight);
    $('#containerTools').height(unitheight*9);


    //drag and drop files screen
    var heightContainerDragDrop = $('#LoaderFiles').height();
    $('#loaded-files-list').height(heightContainerDragDrop-$('#button-section-dd').height()-$('#inputs-section-dd').height()-30);


    //Corpus an Map tools
    var heightContainerMainTools = $('#rowMainTools').height();
    $('#corpusToolContainer').height(heightContainerMainTools);
    $('#Map').height(heightContainerMainTools );

    $('#mapid').height(heightContainerMainTools-$('#header-map').height());
    map.resize();
    $('#toponymsMessageContainer').height(heightContainerMainTools-$('#header-map').height());

    //Corpus content
    $('#textCorpus').height(heightContainerMainTools - $('#header-corpus').height());
    $('#documents-index').height(heightContainerMainTools - $('#header-index').height());


    //Context corpus
    $('#rowSecundaryTools').css("height",document.getElementById("containerTools").offsetHeight-heightContainerMainTools);
    var heightContainerSecundaryTools = $('#rowSecundaryTools').height();
    $('#referencesToolContainer').height(heightContainerSecundaryTools);
    $('#corpusContext').height(heightContainerSecundaryTools);


    //resize filters controls
    var newHeightEntities = $("#colFilters").height()-$("#title_filter_name").height()-$("#title-Filters").height()- $("#general-controls").height()- $("#buttons-controls").height();
    $("#entities-controls").height(newHeightEntities-100);

    //resize references content
    $("#table-coincidences").height(heightContainerSecundaryTools-$('#header-coincidences').height());
    $("#table-context").height(heightContainerSecundaryTools-$('#header-context').height()-$('#tools-context').height());
    $("#table-context-loading").height(heightContainerSecundaryTools-$('#header-context').height());


}

var counterContextChunk = 0;
var bndLoadingContextChunk = false
var bndLoadingContextChunkFinished = false;
var bndOnContextTable = false;
$("#table-context").hover(function (e){
    bndOnContextTable = true;
});

$("#table-context").mouseleave(function (e){
    bndOnContextTable = false;
});

$("#table-context").scroll(function (e){
    var element = e.target;
    var calculated = element.scrollHeight - element.scrollTop;

    if (calculated <= element.clientHeight + 200 && bndOnContextTable)
    {

        if(!bndLoadingContextChunk && !bndLoadingContextChunkFinished) {//si no se estan cargando contextos y llegas al final del scroll
            asyncCallLoadContext(coincidences, counterContextChunk);//se carga mas contextos
        }
    }
});


function contextLoading()
{
    console.log('hola');
   // $('#context-content').hide();
   // document.getElementById('table-context-loading').style.display = 'flex';
    resizeMainWindow();

}

function contextLoaded()
{
    console.log('adios');
   
    document.getElementById('table-context-loading').style.display = 'none';
    resizeMainWindow();
}

function clearInputContext(){
    $('#left-filter').val("");
    $('#right-filter').val("");
}

////Dragging the main Tools (Map and corpus content)
var i = 0;
var dragging = false;
$('#dragbar').mousedown(function(e){
    e.preventDefault();

    dragging = true;
    var main = $('#Map');
    var ghostbar = $('<div>',
        {id:'ghostbar',
            css: {
                height: main.outerHeight(),
                left: main.offset().left - document.getElementById("colFilters").offsetWidth
            }
        }).appendTo('#containerTools');

    $('#containerTools').mousemove(function(e){
        ghostbar.css("left",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        bndOnContextTable = false;
    });


});

$('#containerTools').mouseup(function(e){
    if (dragging)
    {
        $('#corpusToolContainer').css("width",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        $('#Map').css("left",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        $('#ghostbar').remove();
        $('#containerTools').unbind('mousemove');
        dragging = false;
        window.dispatchEvent(new Event('resize'));
        bndOnContextTable = false;
    }
});


////Dragging the secundary Tools (references and corpus context)

var draggingSecundary = false;
$('#dragbarSencundaryTools').mousedown(function(e){
    e.preventDefault();

    draggingSecundary = true;
    var main = $('#corpusContext');
    var ghostbar = $('<div>',
        {id:'ghostbarSecundary',
            css: {
                height: main.outerHeight(),
                left: main.offset().left - document.getElementById("colFilters").offsetWidth
            }
        }).appendTo('#rowSecundaryTools');

    $('#containerTools').mousemove(function(e){

        ghostbar.css("left",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        bndOnContextTable = false;
    });
});

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


let bndOverCorpus = false;
document.onmouseup = function() {
    if(bndOverCorpus && !bndClickTags) {
        var textSelected = getSelectionText();
        if (textSelected.length >= 2) {
            searchInCorpusText(getSelectionText());
        }
    }
};

var corpusElement= document.getElementById("textCorpus");

corpusElement.addEventListener("mouseover", function( event ) {
    bndOverCorpus= true;
}, false);

corpusElement.addEventListener("mouseout", function( event ) {
    bndOverCorpus= false;
}, false);



$('#containerTools').mouseup(function(e){
    if (draggingSecundary)
    {
        $('#referencesToolContainer').css("width",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        $('#corpusContext').css("left",(e.pageX+2)- document.getElementById("colFilters").offsetWidth);
        $('#ghostbarSecundary').remove();
        $('#containerTools').unbind('mousemove');
        draggingSecundary = false;
        window.dispatchEvent(new Event('resize'));
        bndOnContextTable = false;
    }
});

////Dragging the row between tools

var draggingRowTools = false;
$('#dragbarRowTools').mousedown(function(e){
    e.preventDefault();

    draggingRowTools = true;
    var main = $('#rowSecundaryTools');
    var ghostbar = $('<div>',
        {id:'ghostbarRowTools',
            css: {
                width: main.outerWidth(),
                top: main.offset().top
            }
        }).appendTo('#containerTools');

    $('#containerTools').mousemove(function(e){
        ghostbar.css("top",e.pageY+2);
        window.dispatchEvent(new Event('resize'));
        bndOnContextTable = false;
    });
});

$('#containerTools').mouseup(function(e){
    if (draggingRowTools)
    {
        $('#rowMainTools').css("height",e.pageY+2-document.getElementById("containerTitle").offsetHeight);
        $('#ghostbarRowTools').remove();
        $('#rowSecundaryTools').css("height",   document.getElementById("containerTools").offsetHeight+document.getElementById("containerTitle").offsetHeight-e.pageY+2);
        $('#containerTools').unbind('mousemove');
        draggingRowTools = false;
        window.dispatchEvent(new Event('resize'));
        bndOnContextTable = false;

    }
});


function slideFiltersControls(control){
    if($('#'+control).hasClass('activado')){
        $('#'+control).removeClass('activado');
        $('#'+control).slideUp();

    }else{
        //$('.menu li ul').slideUp();
        //$('.menu li').removeClass('activado');
        $('#'+control).addClass('activado');
        $('#'+control).slideDown();
    }
}

$(document).ready(function () {

    $('#corpusFiltersControl').click(function (e) {
        e.preventDefault();
        slideFiltersControls('corpusFilters');
    });

    $('#contextFiltersControl').click(function (e) {
        e.preventDefault();
        slideFiltersControls('contextFilters')
    });

    $('#btn-refresh-gazetteer').click(function (){
       RefreshGazetteer();
    });

});

function showEntities() {
    var selectEntities = document.getElementById("entity");
    var selectSubentities = document.getElementById("subentities");
    var labels = document.getElementById("labels");
    var selectUniqueAnnotations = document.getElementById("uniqueAnnotations");

    selectSubentities.innerHTML = ""
    selectEntities.innerHTML = "";
    selectLabels.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.setAttribute("value","");
    defaultOption.setAttribute("disabled","");
    defaultOption.setAttribute("selected","");
    defaultOption.innerHTML = "Choose an entity";

    selectEntities.append(defaultOption);


    selectEntities.addEventListener("change", function (e) {
        e.preventDefault();
        entitySelected(selectEntities.value);
        controlsController(7);
    });


    selectSubentities.addEventListener("change", function (e) {
        e.preventDefault();
        var selectLabels = document.getElementById("labels");
        selectLabels.innerHTML = "";
        document.getElementById("uniqueAnnotations").innerHTML ="";

        let subentity = getSubentityByCode(selectSubentities.value);

        if(subentity.labels.length>0){
            document.getElementById("list-labels").style.display = "block";

            subentity.labels.forEach(function (label) {
                showLabelsInQueryBulder(selectLabels,label);
            });
        }else{
            document.getElementById("list-labels").style.display = "none";

        }

    });

    /*
    labels.addEventListener("change", function (e) {
        e.preventDefault();
        addActionToQuery( "label='"+labels.value+"'",5);

    });

    selectUniqueAnnotations.addEventListener("change",function (e) {
        addActionToQuery("'"+selectUniqueAnnotations.value+"'",6);

    });

     */

    var filterContent = document.getElementById("entitiesCheckBoxes");


    /* var entitiesQueryContent = document.getElementById("queries-table");
    entitiesQueryContent.innerHTML = "";
    */
    getEntities().forEach(function (entity) {
        var entitySpanColor = document.createElement("div");
        entitySpanColor.setAttribute("class", "filter-entity-color");
        entitySpanColor.style.backgroundColor = entity["color"];

        var entityLabel = document.createElement("div");
        entityLabel.setAttribute("class", "filter-entity-label");
        entityLabel.innerHTML = entity["entity"];

        var entityCheckControl = document.createElement("input");
        entityCheckControl.setAttribute("class", "filter-entity-check");
        entityCheckControl.setAttribute("name", "entities");
        entityCheckControl.setAttribute("id","checkEntity"+entity["code"]);
        entityCheckControl.setAttribute("type", "checkbox");
        entityCheckControl.setAttribute("value", entity["code"]);
        entityCheckControl.setAttribute("onclick", "checkedBoxChild(this,'label:','"+entity["code"]+"');");

        var entityCheckBox = document.createElement("li");
        entityCheckBox.setAttribute("class","filter-entity-checkbox");
        entityCheckBox.setAttribute("id","checkBoxEntity"+entity["code"]);


        var arrowCheckbox = document.createElement("i");
        arrowCheckbox.setAttribute("id",entity["code"]+"ArrowEntity")
        arrowCheckbox.setAttribute("class", "fa fa-chevron-down fa-xs grey-text");
        arrowCheckbox.addEventListener("click", function (e) {
            e.preventDefault();

            slideFiltersControls(entity["code"]+"Filters");

            if($('#'+entity["code"]+"ArrowEntity").hasClass('fa-chevron-down')) {
                $('#'+entity["code"]+"ArrowEntity").removeClass('fa-chevron-down');
                $('#'+entity["code"]+"ArrowEntity").addClass('fa-chevron-up');
            }
            else {
                $('#'+entity["code"]+"ArrowEntity").removeClass('fa-chevron-up');
                $('#'+entity["code"]+"ArrowEntity").addClass('fa-chevron-down');
            }
        });

        var listSubEntities = document.createElement("ul");
        listSubEntities.setAttribute("id",entity["code"]+"Filters");
        listSubEntities.style.display = "none";


        entityCheckBox.appendChild(arrowCheckbox);
        entityCheckBox.appendChild(entitySpanColor);
        entityCheckBox.appendChild(entityLabel);
        entityCheckBox.appendChild(entityCheckControl);
        entityCheckBox.appendChild(listSubEntities);


        filterContent.appendChild(entityCheckBox);

        showEntitiesInQueryBulder(selectEntities,entity["entity"],entity["code"]);
        //showEntityQuery(entitiesQueryContent,entity['entity'],entity['color'],entity['code'],entityCheckControl);
    });
}



function showLabelsInQueryBulder(container,label) {
    var optionLabelContainer = document.createElement("tr");

    var optionLabel = document.createElement("td");
    optionLabel.innerHTML = label;


    optionLabelContainer.appendChild(optionLabel);

    optionLabelContainer.addEventListener("dblclick",function () {
        addActionToQuery("'"+label+"'",5);
    });

    optionLabelContainer.addEventListener("click",function () {
        showUniqueAnnotations(label);
    });

    container.appendChild(optionLabelContainer);

    /*
    var optionLabel = document.createElement("option");
    optionLabel.setAttribute("value",label);
    optionLabel.setAttribute("class","selectOption");
    // optionLabel.setAttribute("onclick", "addLabelToQuery();");
    optionLabel.addEventListener("change", function (e) {
        e.preventDefault();
        document.getElementById("queryOfEntity").value += "label='"+label+"'";
    });
    optionLabel.innerHTML = label;

    container.append(optionLabel);

     */

}

var selectLabels = document.getElementById("labels");
selectLabels.innerHTML = "";

function showSubEntitiesInQueryBulder(container,subentity) {
    var optionSubEntity = document.createElement("option");
    optionSubEntity.setAttribute("value",subentity["code"]);
    optionSubEntity.setAttribute("class","selectOption");
    optionSubEntity.innerHTML = subentity["subentity"];

    container.append(optionSubEntity);
}

function showEntitiesInQueryBulder(container,entityName,entityCode) {
    var optionEntity = document.createElement("option");
    optionEntity.setAttribute("value",entityCode);
    optionEntity.setAttribute("class","selectOption");
    optionEntity.innerHTML = entityName;


    container.append(optionEntity);
}

function showUniqueAnnotationsInQueryBulder(container,annotation) {

    var optionAnnotationContainer = document.createElement("tr");

    var optionAnnotation = document.createElement("td");
    optionAnnotation.innerHTML = annotation;


    optionAnnotationContainer.appendChild(optionAnnotation);

    optionAnnotationContainer.addEventListener("click",function () {
        addActionToQuery("'"+annotation+"'",6);
    });

    optionAnnotationContainer.addEventListener("dblclick",function () {
        alert("doble click en"+annotation);
    });

    container.appendChild(optionAnnotationContainer);
}





function uploadSubEntities() {
    getSubEntities().forEach(function (subentity) {
        if(subentity["keyEntity"] !== "") {
            var filterEntityContainer = document.getElementById(subentity["keyEntity"] + "Filters");

            filterEntityContainer.innerHTML = "";
        }
    });

    getSubEntities().forEach(function (subentity) {

        if(subentity["keyEntity"] !== "") {

            var filterEntityContainer = document.getElementById(subentity["keyEntity"] + "Filters");

            if(subentity["labels"].length !==0 ) {
                var entityCheckbox = document.getElementById("checkBoxEntity" + subentity["keyEntity"]);
                entityCheckbox.style.display = "block";
            }


            subentity["labels"].forEach(function (label) {
                var labelCheckBox = showLabelsOfEntity(subentity["keyEntity"],subentity["code"],label);
                filterEntityContainer.appendChild(labelCheckBox);
            });
        }
    });

}

function showLabelsOfEntity(entity,subentity, label) {

    var filterContent = document.getElementById(entity+ "Filters");//subentity+"SubFilters");

    var Label = document.createElement("div");
    Label.setAttribute("class", "filter-entity-label");
    Label.innerHTML = label;

    var labelCheckControl = document.createElement("input");
    labelCheckControl.setAttribute("class", "filter-label-check");
    labelCheckControl.setAttribute("name", "label:"+entity);
    labelCheckControl.setAttribute("type", "checkbox");
    labelCheckControl.setAttribute("value", label);
    labelCheckControl.addEventListener("click", function (e) {
        e.checked = !e.checked;
        if(isALabelActivated(entity))
            document.getElementById("checkEntity"+entity).checked = true;
        else
            document.getElementById("checkEntity"+entity).checked = false;
    });

    var labelCheckBox = document.createElement("div");
    labelCheckBox.setAttribute("class","filter-subentity-checkbox");

    labelCheckBox.appendChild(labelCheckControl);
    labelCheckBox.appendChild(Label);

//    filterContent.appendChild(labelCheckBox);
    return labelCheckBox;
}

function showUniqueAnnotations(label) {
    var selectUniqueAnnotations = document.getElementById("uniqueAnnotations");
    selectUniqueAnnotations.innerHTML = "";


    getUniqueAnnotations(document.getElementById("entity").value,label).forEach(function (annotation) {
        showUniqueAnnotationsInQueryBulder(selectUniqueAnnotations,annotation);
    });

}

function showUniqueAnnotationsOfEntity() {
    var selectUniqueAnnotations = document.getElementById("uniqueAnnotations");
    selectUniqueAnnotations.innerHTML = "";

    getUniqueAnnotationsOfEntity(document.getElementById("entity").value).forEach(function (annotation) {
        showUniqueAnnotationsInQueryBulder(selectUniqueAnnotations,annotation);
    });
}

function showDocumentInList(documentListName,key) {
    var containerOfDocumentsList = document.getElementById("documents-table");
    var line = document.createElement("tr");

    var columnCheckControl = document.createElement("td")
    var checkBoxControl = document.createElement("input");
    checkBoxControl.setAttribute("type","checkbox");
    checkBoxControl.setAttribute("name","documents");
    checkBoxControl.setAttribute("value",key);
    checkBoxControl.checked = true;
    checkBoxControl.addEventListener("click",function (e) {
        fragmentCorpusActionCheck(e.target.value,e.target.checked);
    });
    columnCheckControl.appendChild(checkBoxControl);
    line.appendChild(columnCheckControl);

    var columnDocumentName = document.createElement("td")
    columnDocumentName.innerHTML = documentListName;
    line.appendChild(columnDocumentName);



    containerOfDocumentsList.appendChild(line);
}

function checkedBoxChild(e,level,entityCode) {
    var checkBoxes = document.getElementsByName(level+e.value);
    if(!e.checked || !isALabelActivated(entityCode)){
        checkBoxes.forEach(function (checkBoxLabel) {
            checkBoxLabel.checked = !!e.checked;
        });

    }
}

var bndNewIndex= null;
var bndOldIndex = null;

$("#textCorpus").scroll(function () {

    documents.forEach(function (document) {
        var elem = $("#first>.corpus>.content>div[key='" + document.key + "']")
        if( elem.length > 0 ) { // if target element exists in DOM

            var elemIndexItem =  $("#first>.index>.content>div[key='" + document.key + "']>div>.title-relation");
            if (elem.is_on_screen()) { // if target element is visible on screen after DOM loaded

                if(bndNewIndex !== document.key) {
                        bndOldIndex = bndNewIndex;
                        bndNewIndex = document.key;
                }else{
                    elemIndexItem.attr("class","title-relation relation-showing");
                }
            } else {
                elemIndexItem.attr("class","title-relation relation-not-showing");
            }

            if(elem.css("display") === "none")
                elemIndexItem.attr("class","title-relation relation-not-showing");
        }
    });

});


$("#allDocuments").click(function (e) {
    document.getElementsByName("documents").forEach(function (checkboxDocument) {
        if(e.target.checked)
            checkboxDocument.checked = true;
        else
            checkboxDocument.checked = false;


        fragmentCorpusActionCheck(checkboxDocument.value,e.target.checked);
    });
});

$('#myModalQuery').on('click', function (e) {
    var modalClosingMethod="";
    if ($(e.target).parent().attr("data-dismiss")) {
        modalClosingMethod = "by Corner X";
    } else if ($(e.target).hasClass("btn-secondary")) {
        modalClosingMethod = "by Close Button";
    } else {
        modalClosingMethod = "by Background Overlay";
    }

    $('#myModalQuery').on('hidden.bs.modal', function () {
        cleanQueryBuilder();
    });
});


function controlsController(controlID) {

}

function cleanAnnotationInformation(){
    document.getElementById("Annotation-relation").innerHTML = "";
    document.getElementById("Annotation-paragraph").innerHTML = "";
    document.getElementById("Annotation-index").innerHTML = "";
    document.getElementById("Annotation-entity").innerHTML = "";
    document.getElementById("Annotation-labels").innerHTML = "";
    document.getElementById("Annotation-context").innerHTML = "";
    document.getElementById("annotations-table").innerHTML = "";
}

function showAnnotationInformation(leftcontext, words, rightContext,relation,entityname,entitycode,labels,index,paragraph){
    document.getElementById("Annotation-relation").innerHTML = relation;
    document.getElementById("Annotation-paragraph").innerHTML = paragraph;
    document.getElementById("Annotation-index").innerHTML = index;
    document.getElementById("Annotation-entity").innerHTML = entityname;
    document.getElementById("Annotation-labels").innerHTML = labels;
    document.getElementById("Annotation-context").innerHTML = leftcontext + "<span class='annotated top-highlighted'>"+words+"</span>" + rightContext;

    var toponymTitle = null;
    if(!labels.includes("toponym")){
         toponymTitle = searchAToponymInTitle(relation);

        if(toponymTitle!==null) {
            showPopupOfMarker(toponymTitle);
            document.getElementById("annotations-table").innerHTML = convertReferencesToHTMLTable(toponymTitle);
        }
    } else {
        document.getElementById("annotations-table").innerHTML = convertReferencesToHTMLTable(words);
        showPopupOfMarker(words);
    }



}

function showAnnotationInformation2(text) {
    alert(text);
}

function isALabelActivated(keyEntity){
    let bndAllActivated = false;

    document.getElementsByName("label:"+keyEntity).forEach(function (label) {
        if(label.checked){
            bndAllActivated = true;

        }
    });

    return bndAllActivated;
}

function cleanFilters(filterId){

    if(filterId !== "TEXT") {
        $("#corpus-search").val("");
    }

    if(filterId !== "QUICKFILTER"){
        var entitiesCheckBoxes = document.getElementsByName("entities");

        entitiesCheckBoxes.forEach(function (checkbox){
            checkbox.checked = false;

            var checkBoxes = document.getElementsByName("label:"+checkbox.value);

            checkBoxes.forEach(function (checkBoxLabel) {
                checkBoxLabel.checked = false;
            });
        });
    }
}

$(document).ready(function () {

   //reloadDataTable();
});

var dataTableContext= null;
function reloadDataTable(){


    if ( $.fn.dataTable.isDataTable('#table-context-scroll') ) {
        dataTableContext = $('#table-context-scroll').DataTable ();
    } else {
        dataTableContext = $('#table-context-scroll').DataTable({

            scrollX: true,
            scrollY: true,
            scrollCollapse: true,
            scroller: true,
            searching: false,
            paging: false,
            info: false,
            pageResize: true,
            colResize: {
                isEnabled: true,
                hoverClass: 'dt-colresizable-hover',
                hasBoundCheck: true,
                minBoundClass: 'dt-colresizable-bound-min',
                maxBoundClass: 'dt-colresizable-bound-max',
                isResizable: function (column) {
                    return column.idx !== 5;
                },
                onResize: function (column) {
                    //console.log('...resizing...');
                },
                onResizeEnd: function (column, columns) {
                }
            },
            columnDefs: [ {
                orderable: false,
                targets: [0,1,2,3,4]
            } ]
        });
    }
}