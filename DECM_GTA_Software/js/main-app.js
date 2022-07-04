var contextNumberOfWords=10;
/* EMILIO */
let corpusFramentsKeys = {};
var bndClickTags=true;

var testParagrah ="";
$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $("#loader").css("display", "none");
        $("#corpus-loader-trigger").click(function () {
            /* EMILIO */
            $("#LoaderFiles").css("display", "none");
            $("#progressLoaded").css("display", "flex");
            processInputFiles();



        });
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    $("#cbToolSelectText").change(function (e){
        var corpusContainer = $("#textCorpus");
        if( $(this).is(':checked') ) {
            bndClickTags = true;
            corpusContainer.removeClass("allSelectable");
            corpusContainer.addClass("unselectable");
        }else{
            bndClickTags=false;
            corpusContainer.removeClass("unselectable");
            corpusContainer.addClass("allSelectable")
        }
    });
/*
    $("#btnToolSelectText").click(function (e){
        var tarjet = $("#btnToolSelectTextIcon");
        var corpusContainer = $("#textCorpus");
        if(tarjet.hasClass("fa-i-cursor"))
        {
            tarjet.removeClass("fa-i-cursor");
            tarjet.addClass("fa-mouse-pointer");
            tarjet.text("  Click Tags");
            bndClickTags=false;
            corpusContainer.removeClass("unselectable");
            corpusContainer.addClass("allSelectable")
        }
        else if(tarjet.hasClass("fa-mouse-pointer"))
        {
            tarjet.removeClass("fa-mouse-pointer");
            tarjet.addClass("fa-i-cursor");
            tarjet.text("  Select Text");
            bndClickTags = true;
            corpusContainer.removeClass("allSelectable");
            corpusContainer.addClass("unselectable");
        }

    });
*/
    $("#file-gazetteer").change(function(e) {
        loadGazetteerFile(e);

    });



    $("#file-gazetteer-csv").change(function(e) {
        loadGazetteerFileCSV(e);
    });

    $("#buttonFilter").click(function (e) {

    });

    $("#btnImportQueries").change(function(e) {
        importQueryFile(e);
    });



    $("#contextLenghtSlider").change(function (e) {
        if($("#contextLenghtSlider").val() >=10 && $("#contextLenghtSlider").val() <=100) {
            document.getElementById("contextLenght").innerHTML = $("#contextLenghtSlider").val();
            loadContextAndGazetterData(coincidences,false);
        }
    });

    $("#contextLenghtSlider2").change(function (e) {
        if($("#contextLenghtSlider2").val() >=10 && $("#contextLenghtSlider2").val() <=100) {
            var contextLenght = $("#contextLenghtSlider2").val();
            document.getElementById("contextLenght2").innerHTML = contextLenght;
            document.getElementById("contextLenght").innerHTML = $("#contextLenghtSlider2").val();
            document.getElementById("contextLenghtSlider").value= $("#contextLenghtSlider2").val();
        }
    });

    //reloadContextCoincidences

    $("#left-filter").keyup(function (e) {
        if(e.target.value === "" && $('#left-filter').val() === "") {
            resetShowingStatusCoincidesces();
            loadContextAndGazetterData(coincidences,false);
        }
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click

            asyncCallSearchInContext(coincidences,1,e.target.value,$('#right-filter').val());
        }
        //if(e.target.value.length >= 3)
            //filterContextCoincidences(e.target.value,$('#right-filter').val());
    });

    $("#right-filter").keyup(function (e) {

        if(e.target.value === "" && $('#left-filter').val() === "") {
            resetShowingStatusCoincidesces();
            loadContextAndGazetterData(coincidences,false);
        }

        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();

            // Trigger the button element with a click
            asyncCallSearchInContext(coincidences,1,$('#left-filter').val(),e.target.value);

        }
        //if(e.target.value.length >= 3)
            //filterContextCoincidences($('#left-filter').val(),e.target.value);
    });

    $("#keyword-search").keyup(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addKeyword();
        }
    });

    $("#keyword").keyup(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addKeyword();
        }
    });

    $("#keyword-alone").keyup(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addKeyword();
        }
    });

    $("#keywordQuery").keyup(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addKeyword();
        }
    });



    $("#controlKeyWords").click(function (event) {
        addActionToQuery("Unique Annotations()",0);

    });

    $("#controlAnd").click(function (event) {
        addActionToQuery("AND",1);

    });

    $("#controlOr").click(function (event) {
        addActionToQuery("OR",2);

    });

    $("#controlXor").click(function (event) {

        addActionToQuery("XOR",3);

    });

    $("#controlParenthesis").click(function (event) {

        addActionToQuery("()",4);

    });


    $("#controlEqual").click(function (event) {

        addActionToQuery("label=",7);

    });

    $("#controlGreatherThanEqual").click(function (event) {

        addActionToQuery("label>=",8);

    });
    $("#controlLessThanEqual").click(function (event) {

        addActionToQuery("label<=",9);

    });

    $("#controlLessThan").click(function (event) {

        addActionToQuery("label:<",10);

    });

    $("#controlGratherThan").click(function (event) {

        addActionToQuery("label:>",11);

    });
    $("#controlNot").click(function (event) {
        addActionToQuery("labelNOT",12);

        /*
        document.getElementById("queryOfEntity").value += "NOT";
        buildQueryString();
        setCursorToPosition( document.getElementById("queryOfEntity").value.length);

         */
    });

    $("#queryOfEntity").click(function (event) {
        buildQueryString();
    });


    $("#queryOfEntity").keyup(function (event) {

// Number 13 is the "Enter" key on the keyboard
        if (event.keyCode !== 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click

            buildQueryString();
        }
    });

    $("#queryOfEntity").bind('keyup click',function (event) {
        parenthesisPosition();
    });


});

var inputKeywordsBnd = false;

function parenthesisPosition() {
    var textarea = document.getElementById('queryOfEntity');
    var positionOfString = textarea.selectionStart;
    var substring = textarea.value.substring(0,positionOfString);
    if(substring.lastIndexOf("(")!== -1)
        if(substring.substring(substring.lastIndexOf("(")-8,substring.lastIndexOf("("))=== "KEYWORDS" && substring.lastIndexOf(")")=== -1) {
            console.log("ingresarás keywords");
           inputKeywordsBnd = true;
        }else
            inputKeywordsBnd = false;

}

function addActionToQuery(controlValue, controlId) {
    var textarea = document.getElementById('queryOfEntity');

    if(textarea.value === "ALL LABELS")
        textarea.value = "";

    var positionOfString = textarea.selectionStart;

    var newCursorPosition=0;
    if(inputKeywordsBnd){
        if(controlId === 1 || controlId === 2 || controlId === 3){
            
             newCursorPosition =textarea.value.indexOf(")",positionOfString-1)+controlValue.length+1;
           // textarea.value = textarea.value + controlValue;
            textarea.value = textarea.value.substring(0, positionOfString+1) + controlValue + textarea.value.substring(positionOfString+1);
            positionOfString++;
            inputKeywordsBnd = false;
            
            
        }else if(controlId === 6 )
        {
            if(textarea.value.substring(positionOfString-1,positionOfString) === "(")
                textarea.value = textarea.value.substring(0,positionOfString) + controlValue + textarea.value.substring(positionOfString);
            else {
                controlValue = ","+controlValue;
                textarea.value = textarea.value.substring(0, positionOfString)+ controlValue + textarea.value.substring(positionOfString);
            }
            newCursorPosition = positionOfString + controlValue.length;
        }
    }
    else {
        
        
        if(controlId === 1 || controlId === 2 || controlId === 3) {

            positionOfString = getPositionToInsert(QueryNode,textarea.selectionStart);
            textarea.value = textarea.value.substring(0, positionOfString) + controlValue + textarea.value.substring(positionOfString);
            newCursorPosition = positionOfString + controlValue.length;
        }else {
            textarea.value = textarea.value.substring(0, positionOfString) + controlValue + textarea.value.substring(positionOfString);
            newCursorPosition = positionOfString + controlValue.length;
        }
    }


    buildQueryString();


    //control de los parentesis en kerywourds o solos
    if(controlId === 0 || controlId === 4) {
        setCursorToPosition(newCursorPosition - 1);
        parenthesisPosition();
    }
    else
        setCursorToPosition(newCursorPosition);


    controlsController(controlId);
}

function setCursorToPosition(position)
{
    var elem = document.getElementById("queryOfEntity");

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', position);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange( position,  position);
            }
            else
                elem.focus();
        }
    }
}

$.fn.is_on_screen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

let missingFragmentsCounter;
let isCorpusProcessed = false;
let labels = [];


function waitFragmentsProcessing(){
    if ( missingFragmentsCounter === 0 && isCorpusProcessed){
        $("#loader").css("display", "none");
        $("#corpus-loader").css("display", "none");
    } else{
        setTimeout(waitFragmentsProcessing, 1000);
    }
}

function processCorpusFragment(fileName, fileContent, typeInput,part,key){
    showDocumentInList(fileName,key);

    $("#gta-tools").css("display", "inline");

    var relation =$("#first>.corpus>.content>div[key='" + key + "']");


    if(relation.length === 0) {
        console.log("Se hace la primera vez");
        /* EMILIO */
        $("#first>.index>.content").append(buildIndexItem(fileName.substring(0, fileName.lastIndexOf(".")), key));

        if(typeInput === 1)
            $("#first>.corpus>.content").append(buildCorpusFragment(fileContent, key));
        else
        {
            $("#first>.corpus>.content").append(buildCorpusFragmentByHTML(fileContent, key,part));
        }
    }else
    {
        relation.append(buildCorpusParagraph(fileContent,part));
    }

}





function buildIndexItem(fileName, key){

    /* EMILIO */
  corpusFramentsKeys[fileName] = key;

  return '<div class="row wrapper mx-1 relation" key="' + key + '">\n' +
      '                          <div class="col-md-10 wrapper" >\n' +
      '                            <p class="title-relation relation-not-showing" onclick="GotoRelation(\'' + key + '\')" >' + fileName + '</p>\n' +
      '                          </div>\n' +
      '                          <div class="col-md-2 wrapper" style="display: flex; align-items: center;">\n' +
      '                            <button class="ml-1 action-button visible" onclick="fragmentCorpusAction(\'' + key + '\', this)">  <i class="fas fa-eye active-relation"></i></button>\n' +
      '                          </div>\n' +
      '\n' +
      '                        </div>';

}

function GotoRelation(key) {

    var corpusContainer = document.getElementById("textCorpus");
    var file = corpusContainer.querySelector("[key='" + key + "']");
    file.scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function buildCorpusFragment(textContent,  key){

    let html = "<div key='" + key + "' class='paragraph-visible'>";
    let lines = textContent.split("\n");
    let line;
    let notLines = 0;
    for (let i = 0 ; i < lines.length ; i++){
        line = lines[i];
        if (line.trim() !== ""){
            html += "<p class='s1p" + (i - notLines + 1) + " mb-2'>";
            html += line;
            html += "</p>";
        } else {
            notLines ++;
        }
    }
    return html + '</div>';
}

function buildCorpusFragmentByHTML(textcontent,key,part){


        let div = document.createElement('div');
        div.setAttribute('key', key);
        div.setAttribute('class', 'paragraph-visible');

        let p = document.createElement('p');
        p.setAttribute('class', '' + part + ' mb-2');
        p.textContent = textcontent;

        div.append(p);


    return div;

/*
    let html = "<div key='" + key + "' class='paragraph-visible'>";

    html += "<p class='"+part+" mb-2'>";

    html += textcontent;
    html += "</p>";

    return html + '</div>';

 */
}
function  buildCorpusParagraph(textcontent,part){
    let p = document.createElement('p');
    p.setAttribute('class', '' + part + ' mb-2');
    p.textContent = textcontent;

    return p;
}


function removeLabels(key){
    $("#remove-labels-" + key).css("display", "none");
    $("label[for='add-labels-" + key + "']").css("display", "inline-flex");
    labels = labels.filter(function(value, index, arr){
        if (value.fragment === key){
            let selector = "div[key='" + key + "']>p." + value.line + ">span[index='" + value.index + "']";
            $(selector).removeClass("annotation");
            $(selector).css("background-color", "unset");
            return false;
        } else {
            return true;
        }
    })
}

function searchAnnotation(span){

    var paragraphText = getTextOfHtml(span.getAttribute("relation"),span.getAttribute("paragraph"));




    var entitycode = span.getAttribute("entity");
    var entityname = getEntityByKey(entitycode);
    var index = span.getAttribute("index");
    var relation = getNameOfRelation(span.getAttribute("relation"))["name"];
    var paragraph = span.getAttribute("paragraph");
    var leftContext = getLeftContext(paragraphText.substring(0,index));
    var rightContext = getRightContext(paragraphText.substring(parseInt(index)+span.innerText.length,paragraphText.length));


    var labels = span.getAttribute("labels");

    showAnnotationInformation(leftContext, span.textContent, rightContext,relation,entityname,entitycode,labels,index,paragraph);

}


function searchAnnotationMatches(span){
 
    if(bndClickTags===true) {
        var toSearch = "";
        contextLoading();
        if (span.textContent !== "" && span.textContent !== "Search matches") {
            toSearch = span.textContent;
        } else if (span.getAttribute("toponym") !== "") {
            toSearch = span.getAttribute("toponym");
        }

        if (toSearch !== "" ) {
            console.log(toSearch);
            annotationTable.innerHTML = "";
            coincidences = runFilterByKeyword(toSearch.toLowerCase());
            let contextContent = document.getElementById("contextContent");
            contextContent.innerHTML = "";
            contextLoaded();
            loadContextAndGazetterData(coincidences, false);
            cleanFilters("DBLCLICK");
            cleanAnnotationInformation();
            //searchAnnotation(span);
        }
        
    }
}


//Working on

function fragmentCorpusAction(key, node){
    let button = $(node);
    if (button.hasClass("visible")){
        button.removeClass("visible")
        button.find("i").removeClass("fa-eye").addClass("fa-eye-slash");
        button.find("i").removeClass("active-relation").addClass("grey-text");

        $("#first>.corpus>.content>div[key='" + key + "']").css("display", "none").removeClass("paragraph-visible");

    } else {
        button.addClass("visible")
        button.find("i").removeClass("fa-eye-slash").addClass("fa-eye");
        button.find("i").removeClass("grey-text").addClass("active-relation");

        $("#first>.corpus>.content>div[key='" + key + "']").css("display", "block").addClass("paragraph-visible");
    }
}

function fragmentCorpusActionCheck(key,bnd) {
    if(!bnd)
    {
        $("#first>.corpus>.content>div[key='" + key + "']").css("display", "none").removeClass("paragraph-visible");
    }else
    {
        $("#first>.corpus>.content>div[key='" + key + "']").css("display", "block").addClass("paragraph-visible");
    }
}


function buildRandomKey(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function searchInCorpus() {
    var toSearch = "";

    if($("#corpus-search").val() !== ""){
        contextLoading();
        toSearch = $("#corpus-search").val();
        annotationTable.innerHTML="";
        coincidences = runFilterByKeyword(toSearch);

        //en caso de que no haya coincidencias anotadas buscar en texto
        if(coincidences.length === 0)
            coincidences = searchInCorpusText(toSearch);
        else
        {
            let contextContent= document.getElementById("contextContent");
            contextContent.innerHTML = "";
            loadContextAndGazetterData(coincidences,true);
            cleanFilters("TEXT");
        }
        contextLoaded();


    }
}

function searchInCorpusText(textToSearch){

        contextLoading();
        cleanCoincidencesByKeyWord();
        documents.forEach(function (RelationDocument) {

            $("#first>.corpus>.content> div[key|='" + RelationDocument.key + "']").children().each(function (index, paragraph) {
                //parse paragraph
                var paragraphId = paragraph.getAttribute("class").split(" ")[0];
                var paragraphText = getTextOfHtml(RelationDocument.key, paragraphId);
                searchCoincidencesInText(textToSearch, paragraphText).forEach(function (coincidenceInText) {
                    addCoincidenceByKeyWord(RelationDocument.key, RelationDocument.name, textToSearch, coincidenceInText, paragraphId);
                });
            });
        });

        coincidences = getCoincidencesByKeyWord();
        cleanPolygons();
        clearInputContext();
        cleanFilters("TEXT");

        contextLoaded();
        loadContextAndGazetterData(coincidences, true);

}

function searchCoincidencesInText(textToSearch,paragraphText){
    var indexes =[];
    var cuenta = 0;
    var posicion = paragraphText.indexOf(textToSearch);
    while ( posicion !== -1 ) {
        cuenta++;
        indexes.push(posicion);
        posicion = paragraphText.indexOf(textToSearch,posicion+1);
    }

    return indexes;
}

function coincidencesInContext(toSearch,paragraph, paragraphElementText,fromindex,contextLength,contextContent,relationName){
    var indexOfSearch = paragraphElementText.indexOf(toSearch,fromindex);

    if(indexOfSearch!== -1)
    {
        var rightContext = getRightContext(paragraphElementText.substring(indexOfSearch+toSearch.length,paragraphElementText.length));
        var leftContext = getLeftContext(paragraphElementText.substring(0,indexOfSearch));
         showContextCoincidence(leftContext,toSearch,rightContext,paragraph,relationName,contextContent);

        coincidencesInContext(toSearch,paragraph,paragraphElementText,indexOfSearch+toSearch.length,contextLength,contextContent,relationName);

    }
}

function filterQueryByText() {
    let keyWords = [];
    findCoincidences(keyWords);
}


function findCoincidences(keywords){
    let contextLength = $("#contextLenghtSlider").val();

    let contextContent= document.getElementById("contextContent");

    contextContent.innerHTML='';

    var checkBoxes = document.getElementsByName("entities");
    var entities = [];
    checkBoxes.forEach(function (checkBoxEntity) {
        if(checkBoxEntity.checked)
            entities.push(entitySelected(checkBoxEntity.value));
    });

    let found = [];


    found = getCoincidences(entities,keywords);
    found.forEach(function (coincidence) {

        var corpusContainer = document.getElementById("textCorpus");

        var file = corpusContainer.querySelector("[key='" + coincidence.key + "']");

        if($(file).hasClass("paragraph-visible")){
            var paragraph = file.getElementsByClassName(coincidence.paragraph)[0];
            var paragraphElementText = paragraph.innerHTML;

            var lessContextIndex = (coincidence.index-1)-contextLength;
            var maxContextIndex = coincidence.index+coincidence.label.length+contextLength;
            if(lessContextIndex<0)
                lessContextIndex=0;

            if(maxContextIndex > paragraphElementText.length)
                maxContextIndex =paragraphElementText.length;



            showContextCoincidence(paragraphElementText.substring(lessContextIndex,coincidence.index),
                coincidence.label,
                paragraphElementText.substring(coincidence.index+coincidence.label.length,maxContextIndex),
                paragraph,
                coincidence.key,
                contextContent);
        }



    });
}

function entitySelected(entity) {
    var checkBoxes = document.getElementsByName("label:"+entity);

    var labelsSelected = [];

    var entityObject = {
        value: entity,
        labels: labelsSelected
    };

    checkBoxes.forEach(function (checkBoxLabel) {
        if(checkBoxLabel.checked)
            entityObject.labels.push(checkBoxLabel.value);
    });
    return entityObject;
}


function highlightCoincidences(array){

    $(".highlighted").removeClass("highlighted");//limpia las consultas anteriores
    $.each(array, function (index, annotation) {

        target = $("#first>.corpus>.content>div[key='" + annotation["key"] + "']")
            .find("." + annotation["paragraph"])
            .find("span[index=" + annotation["index"] + "]");
        target.addClass("highlighted");
    });

}

function showContextCoincidence(leftContext, words, rightContext, elementoToSmooth,relation,contextContent) {
    var line = document.createElement("tr");
    line.setAttribute("class", "context-coincidence");

    var columnRelation = document.createElement("td");
    columnRelation.setAttribute("class", "title-context-right");
    columnRelation.innerHTML= relation;
    line.appendChild(columnRelation);

    var columnContextLeft = document.createElement("td");
    columnContextLeft.setAttribute("class", "title-context-left ");
    columnContextLeft.innerHTML = leftContext;
    line.appendChild(columnContextLeft);

    var columnKeyWords = document.createElement("td");
    columnKeyWords.setAttribute("class", "title-context-center context-center");
    columnKeyWords.innerHTML = words;
    columnKeyWords.addEventListener("click", function () {
        elementoToSmooth.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    });
    line.appendChild(columnKeyWords);

    var columnContextRight = document.createElement("td");
    columnContextRight.setAttribute("class", "title-context-right ");
    columnContextRight.innerHTML = rightContext;
    line.appendChild(columnContextRight);

    contextContent.appendChild(line);

}

function getRightContext(allContext) {
    var cont;
    var indexOfSpace=0;
    let contextLength = $("#contextLenghtSlider").val();


    for (cont=0; cont<=contextLength; cont++){
        var index = allContext.indexOf(" ",indexOfSpace);
        if(index !== -1)
        indexOfSpace = index+1;
        else
            indexOfSpace = allContext.length;
    }
    return allContext.substring(0,indexOfSpace);
}

function getTextOfHtml(key,paragraph){
    var paragraphHtmlText = $("div[key='" + key + "'] > p."+ paragraph).html().toString().replaceAll("<br>","\n");
    var newObject = $("<p></p>").html(paragraphHtmlText);
    return newObject.text();

}

function getLeftContext(leftContext) {

    var cont;
    var indexOfSpace=leftContext.length;
    let contextLength = $("#contextLenghtSlider").val();

    for (cont=0 ; cont<=contextLength; cont++){
        var index = leftContext.lastIndexOf(" ",indexOfSpace);
        if(index !== -1)
            indexOfSpace = index-1;
        else
            indexOfSpace = 0;
    }

    if(indexOfSpace!=0)
        indexOfSpace++;
    return leftContext.substring(indexOfSpace,leftContext.length);
}



function searchRightContext(numWord,coincidence){
    var context="";

    var right = parseInt(numWord) + 1;
    for ( right ; right<= parseInt(numWord)+contextNumberOfWords ;right++)
    {
        context +=  $("#first>.corpus>.content>div[key='" + coincidence["key"] + "']")
            .find("." + coincidence["paragraph"])
            .find("span[word=" +right.toString()+ "]").text();
        context += " ";
    }

    return context;
}


function filterContextCoincidences(filterLeft, filterRight) {


    var arrayContextCoincidences = document.getElementsByClassName("context-coincidence");

    arrayContextCoincidences.forEach(function (elementContext) {
        var elements = elementContext.getElementsByTagName("td");
        let contextLeft = elements[1].innerHTML || elements[1].innerText;
        let contextRight = elements[3].innerHTML || elements[3].innerText;
        if(contextLeft.toLowerCase().includes(filterLeft.toLowerCase()) && contextRight.toLowerCase().includes(filterRight.toLowerCase()))
            elementContext.style.display = "table-row";
        else
            elementContext.style.display = "none";
    });
}

function exportCoincidences(e){
    const rbs = document.querySelectorAll('input[name="exporttoggle"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }

    if(selectedValue === "0")
        exportCoincidencesToFile("text/csv; charset=utf-18",e,"csv");
    else
        exportCoincidencesToFile("json/plain",e,"json");
}

async function asyncCallSearchInContext(coincidences, start, textLeft,textRight){

    let setNumber = 200;
    const  result = await processSearchTextInContext(coincidences.length,start,setNumber,textLeft,textRight);


    if(result !== "END") {
        $("#coincidences-progress").html(result);
        start++;
        asyncCallSearchInContext(coincidences, start,textLeft,textRight);
    }else
    {
        loadContextAndGazetterData(coincidences,false);
    }

}

function processSearchTextInContext(sizeCoincidences,start,setNumber,textLeft,textRight){
    return new Promise(resolve => {
        setTimeout(() => {
            let setToDisplay = start * setNumber;

            if(setToDisplay <= sizeCoincidences){
                if(start === 1){
                    coincidences.slice(0,setNumber).forEach(function (coincidence){
                        existTextInContext(coincidence,textLeft,textRight);
                    });
                }
                else {
                    coincidences.slice(setToDisplay-setNumber,setToDisplay).forEach(function (coincidence){
                        existTextInContext(coincidence,textLeft,textRight);
                    });
                }

                resolve("Searching... "+parseInt((setToDisplay/sizeCoincidences)*100) + "%");
            }
            else {

                coincidences.slice(setToDisplay-setNumber,sizeCoincidences).forEach(function (coincidence){
                    existTextInContext(coincidence,textLeft,textRight);
                });


                resolve("END");
            }
        },200);
    });
}

function existTextInContext(annotation,textLeft,textRight){
    var bndExistLeft = false;
    var bndExistRight = false;
    var annotationElement = $("div[key='" + annotation["key"] + "'] > p." + annotation["paragraph"] + " span[index='" + annotation["index"] + "']")[0];

    if(textLeft !== "" && textLeft !== undefined ) {
        var leftContext = getLeftContextCoincidence(annotationElement);

        if (leftContext.includes(textLeft)) {
            bndExistLeft = true;
        }
    }else
        bndExistLeft = false;

    if(textRight !== "" && textRight !== undefined ) {

        if (getRightContextCoincidence(annotationElement).includes(textRight)) {
            bndExistRight = true;
        }
    }else
        bndExistRight = false;

    if(textLeft === "" && textRight === "" ){
        annotation.bndInContext = true;
    } else if(bndExistLeft || bndExistRight)
        annotation.bndInContext = true;
    else if(!bndExistRight && !bndExistLeft)
        annotation.bndInContext = false;
}


async function asyncCallExportCoincidences(coincidences,start,type,e,ext){

    let setNumber = 200;
    const  result = await appendAnnotationsToExport(coincidences.length,start,setNumber,type);

    if(result !== "END") {

        $("#coincidences-export").html(result+ "%");
        progressBar(result)
        start++;
        asyncCallExportCoincidences(coincidences, start,type,e,ext);
    }else
    {
        $("#coincidences-export").html("100%");
        progressBar(100);
        downloadFileExported(type,e,ext);
        progressBar(1);
        $("#progress-gta").hide();
        $("#btn-export").show();

    }

}
function progressBar(result){
        var elem = document.getElementById("bar-gta");
        var width = result;
        elem.style.width = width + "%";

}
function appendAnnotationsToExport(sizeCoincidences,start,setNumber,type){
    return new Promise(resolve => {
        setTimeout(() => {
            let setToDisplay = start * setNumber;

            if(setToDisplay <= sizeCoincidences){
                if(start === 1){
                    coincidences.slice(0,setNumber).forEach(function (coincidence){
                        addAnnotationToExport(coincidence,type);
                    });
                }
                else {
                    coincidences.slice(setToDisplay-setNumber,setToDisplay).forEach(function (coincidence){
                        addAnnotationToExport(coincidence,type);
                    });
                }

                resolve(""+parseInt((setToDisplay/sizeCoincidences)*100) );
            }
            else {

                coincidences.slice(setToDisplay-setNumber,sizeCoincidences).forEach(function (coincidence){

                    addAnnotationToExport(coincidence,type);
                });


                resolve("END");
            }
        },200);
    });
}
 function exportCoincidencesToFile(type,e,ext){
     annotationsToExport = [];
     $("#btn-export").hide();
     $("#progress-gta").show();
     $("#coincidences-export").text("1%");

     asyncCallExportCoincidences(coincidences,1,type,e,ext);

}

function downloadFileExported(type,e,ext){
    $("#coincidences-export").html("Downloading file");

    var utc = new Date().toJSON().replace(/-/g,'-');


    var a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);


    if(getAnnotationsToExport().length>0) {
        var contentCoincidences;
        //console.log("archivo a descargar"+ ext);
        if (ext === "json")
            contentCoincidences = JSON.stringify(annotationsToExport);
        else
            contentCoincidences = convertJSONToCSV(annotationsToExport);

        var blob = new Blob(["\uFEFF"+contentCoincidences], {type: type});
        var url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = "coincidences_"+utc+"."+ext;
        a.click();
        window.URL.revokeObjectURL(url);

       // $("#coincidences-export").html("");
    }else
        alert("you don't have any coincidences");
}

function getKeysToCSV(listObjects){
    var counterKeys = 0;
    var object = null;

    listObjects.forEach(function (objectList){
        if(object === null) {
            object = objectList;
            counterKeys = Object.keys(objectList).length;
        }

        if(object !== null && Object.keys(objectList).length > counterKeys){
            object = objectList;
            counterKeys = Object.keys(objectList).length;
        }
    });

    return Object.keys(object);
}

function convertJSONToCSV(dataJson){
    console.log(dataJson);
    var fields = getKeysToCSV(dataJson);


    var replacerReference = function (key,value){
        console.log(value);
        var result = '';
        if(value === null || value === undefined)
            result = '';
        else
            result =  value.toString();

        return result;
    }
    var replacer = function(key, value) {
        var result = "";
        if(value === null )
            result = "";
        else if(key === "labels")
            result = value.toString();
        else
            result = value;
        return result;
        //return value === null ? '' : value
    }

    var replacerLabels = function(key, value) {
        var result = '';
        if (value === null)
            result = '';
        else {
            if (value.length === 0)
                result = '';
            else {
                value.forEach(function (label){
                    if(result !== '')
                        result += ","+label;
                    else
                        result = label;

                });
            }
        }

        return result;
    }

    var csv = dataJson.map(function(row){
        return fields.map(function(fieldName){
                if(fieldName.includes("REF") === false && fieldName !== "labels")
                    return JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""') ;

                else if(fieldName === "labels")
                    return JSON.stringify(row[fieldName],replacerLabels).replace(/\\"/g, '""') ;
                else {
                    console.log("columna de referencia: "+ fieldName);
                    return JSON.stringify(row[fieldName], replacerReference).replace(/\\"/g, '""');
                }
        }).join(',')
    })

    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    return csv;
}

function getRightContextText(){

}

function getLeftContextCoincidence(annElement){
    let contextLength =  $("#contextLenghtSlider").val();
    //Left Context
    leftHTML = "";

    leftSibling = annElement["previousSibling"];
    for (let i = 0 ; i < contextLength && leftSibling != null ; i++){
        leftHTML = parseSiblingOnlyText(leftSibling, i) + leftHTML;
        leftSibling = leftSibling["previousSibling"];
    }

    return getLeftContext(leftHTML);
}

function getRightContextCoincidence(annotationElement){
    //Right Context
    rightHTML = "";
    let contextLength =  $("#contextLenghtSlider").val();

    rightSibling = annotationElement["nextSibling"];

    for (let i = 0 ; i < contextLength && rightSibling != null ; i++){
        if (coincidences.includes(rightSibling)) rightSibling.classList.add("top-highlighted");
        {
            var rightContext = parseSiblingOnlyText(rightSibling,i);
            rightHTML += rightContext;
        }
        rightSibling = rightSibling["nextSibling"];
    }
    return getRightContext(rightHTML);
}

function createFileQuery(filename,type,element) {
    //var blob = new Blob([text], {type:'text/plain'});
    if(queryBuilderStructure.queries.length>0) {
        var contentJsonQuery = JSON.stringify(queryBuilderStructure);
        var blob = new Blob([contentJsonQuery], {type: type});
        var link = document.createElement("a");
        element.download = filename;
        element.innerHTML = "Export";
        element.href = window.URL.createObjectURL(blob);
    }else
        alert("you don't have any queries added");
}




function searchAToponymInTitle(relation){
    var wordsInTitle = relation.replaceAll("_"," ").split(" ");//dividir las palabras del titulo de la relación

    //sacar las palabras que no sean mayores de 4 letras para evitar palabras como "de", "y", "la", numeros, etc
    wordsInTitle = wordsInTitle.filter(function (word){
        if(word.length>4)
            return true;
    });

    //buscar un toponimo que coincida con alguna de las palabras del titulo de la relación
    var toponymFounded = null;

    //se hace una busqueda de toponimos por cada palabra
    wordsInTitle.forEach(function (word){

        if(toponymFounded === null)//si aún no se encuentra un toponimo
            if(existToponym(word) )//si se encuentra se desogna para esa anotación
                toponymFounded = word;
    });

    return toponymFounded;
}
