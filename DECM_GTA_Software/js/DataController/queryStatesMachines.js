
var queryTest1 = "label=NOT'male'AND(label='female'KEYWORDS('Ana de Zornosa','sacerdotes')AND(label='porfis'XORlabel=NOT'male'))";
let queryTest3 = "label=NOT'male'";
let queryTest4 = "(label='prueba'XORlabel=NOT'title'KEYWORDS('CASA','cementerio'))AND(label='female'ANDlabel=NOT'male'KEYWORDS('SDFHS'))";
let queryTest9 = "label='female'KEYWORDS('Ana de Zornosa','sacerdotes')ANDlabel=NOT'male'";
let queryTest8 = "((label='female'KEYWORDS('Ana de Zornosa','sacerdotes')ANDlabel='male'KEYWORDS('Ana nosa','jazmin'))ORlabel=NOT'title')ANDlabel='ahdsahdoasihdaois'";
let queryTest5 = "(label='female'ANDlabel=NOT'title')ORlabel=NOT'male'";



var firstOpen = -1;

let alfabeto =["label","=","'","AND","OR","XOR","NOT"," ",",","Unique Annotations","(",")",">=","<=",":>",":<","ALL","LABELS"];
                        //alfabeto
let statesMachine  = [[ 1,-1,-1,-1,-1,-1,-1, 0,-1,-1, 0,-1,-1,-1,-1,-1,11,-1],
                 /*1*/[-1, 2,-1,-1,-1,-1, 2, 1,-1,-1,-1,-1, 2, 2, 2, 2,-1,-1],
                 /*2*/[-1,-1, 4,-1,-1,-1,-1, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                 /*3*/[-1,-1, 4,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*estado*/       /*5*/[-1,-1,-1, 0, 0, 0,-1, 5,-1, 6,-1, 5,-1,-1,-1,-1,-1,-1],
                 /*6*/[-1,-1,-1,-1,-1,-1,-1, 6,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1],
                 /*7*/[-1,-1, 8,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                 /*8*/[-1,-1, 9,-1,-1,-1,-1, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                 /*9*/[-1,-1,-1,-1,-1,-1,-1, 9, 7,-1,-1,10,-1,-1,-1,-1,-1,-1],
                /*10*/[-1,-1,-1, 0, 0, 0,-1,10,-1,-1,-1,10,-1,-1,-1,-1,-1,-1],
                /*11*/[-1,-1,-1,-1,-1,-1,-1,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,12],
                /*12*/[-1,-1,-1,-1,-1,-1,-1,12,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
                /*13*/[-1,-1,-1,-1,-1,-1,-1,13,-1,-1,14,-1,-1,-1,-1,-1,-1,-1],
                /*14*/[-1,-1,15,-1,-1,-1,-1,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                /*15*/[-1,-1,16,-1,-1,-1,-1,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                /*16*/[-1,-1,-1,-1,-1,-1,-1,16,-1,-1,-1,17,-1,-1,-1,-1,-1,-1],
                /*17*/[-1,-1,-1,-1,-1,-1,-1,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let terminalStates = [5,10,12,17];

var parenthesis = [0,0] //array control for parenthesis -> [open,close]

var parenthesis = [];

var bndKeywords= false;


var columnError="";

var currentStateGlobal=0;

function ErrorMessageBuilder(simbolExpected,indexError) {
    return "Error: Near of "+ simbolExpected+ ", in column "+indexError;
}

function newQueryObject() {
    return {
        firstLabel: "",
        secondLabel:"",
        notFirstLabel: true,
        notSecondLabel: true,
        firstOperator: 0,
        secondOperator:0,
        operator:0,
        firstKeywords: [],
        secondKeywords:[],
        positionOpenParenthesis: -1,
        positionCloseParenthesis: -1,
        childQueryNode: null,
        secondChildQueryNode: null,
        allLabels: false
    };
}

var tmpQuery  = newQueryObject();

var bndTmpQuery = false;

var listTmpQuery =  [];

var QueryNode = newQueryObject();

var queryBuilderStructure={  documents:[],
    queries:[],
    typeSearch :0,
    textToSearch : ""};

var positionInString =0;



function errorStatesMachine(message,color,stateButton,boolQuery) {
    var errorElement = document.getElementById("errorValidation");

    errorElement.innerHTML = message;
    errorElement.style.color = color;
    btnAddQuery.removeAttr(stateButton);
    bndQuery = boolQuery;
}

function aceptedStatesMachine(message,color,stateButton,boolQuery) {
    var errorElement = document.getElementById("errorValidation");

    errorElement.innerHTML = message;
    errorElement.style.color = color;
    document.getElementById("btnAddQuery").disabled = stateButton;
    bndQuery = boolQuery;
}


function validateQuery(query)
{
       QueryNode = newQueryObject();
positionInString = 0;
    parenthesis[0]=0;
    parenthesis[1]=0;
if(document.getElementById("queryOfEntity").value  !== "") {
    var indexError = getNewState(currentStateGlobal, queryTest1);
    //console.log("Current State: "+ currentStateGlobal);
    //console.log(QueryNode);
    if(QueryNode.allLabels){
        errorStatesMachine("you are going to get all the labels of the entity","green","disabled",true);
    }else if(currentStateGlobal !== terminalStates[0] && currentStateGlobal !==terminalStates[1] && currentStateGlobal !==terminalStates[2] && currentStateGlobal !==terminalStates[3]) {
        errorStatesMachine(ErrorMessageBuilder(columnError,positionInString),"red","disabled",false);
    } else
    {

        if(parenthesis[0] === parenthesis[1] && queryTest1.length === 0) {
            if(currentStateGlobal === 12 )//ALL LABELS
                aceptedStatesMachine("Query Accepted: get all labels","green",true,true);
            else
                aceptedStatesMachine("Query Accepted","green",true,true);
        }
        else {

            if(queryTest1.length !== 0) {
                errorStatesMachine(ErrorMessageBuilder(columnError,positionInString),"red","disabled",false);
            }
            else if (parenthesis[0] !== parenthesis[1]) {
                errorStatesMachine("parentesis perdidos, parentesis " + parenthesis,"orange","disabled",false);
            }

        }
    }
}else {
    errorStatesMachine("Empty Query","red","disabled",false);
}








}


function getNewState(currentState,query) {
    var indexPositionError = -1;
    //if(document.getElementById("queryOfEntity").value === "ALL LABELS"){
     if(document.getElementById("queryOfEntity").value === ""){
        errorStatesMachine("Empty Query","red","disabled",false);
        /* QueryNode = newQueryObject();
            QueryNode.allLabels = true;

         */
    }
     else{
        statesMachine[currentState].forEach(function (alfabetItem, index) {
            if (alfabetItem !== -1) {
                if (alfabeto[index].localeCompare(query.substring(0, alfabeto[index].length)) === 0) {
                    indexPositionError = index;
                    positionInString = positionInString + alfabeto[index].length;
                    queryTest1 = query.substring(alfabeto[index].length, query.length);
                    currentStateGlobal = alfabetItem;

                    if(alfabeto[index].localeCompare(" ")===0){

                       // console.log("query: "+queryTest1+ "state:" +currentStateGlobal + " index" +queryTest1.indexOf(" "));
                    }else{
                        if (currentStateGlobal === 0 && alfabeto[index].localeCompare("(") === 0) {
                            QueryNode.positionOpenParenthesis = positionInString;
                            firstOpen = positionInString;
                        }

                        if ((currentStateGlobal === 5 || currentStateGlobal === 10) && alfabeto[index].localeCompare(")") === 0 && !bndKeywords) {

                            if (firstOpen !== -1 && firstOpen !== -2) {
                                QueryNode.positionOpenParenthesis = firstOpen;
                                firstOpen = -2;
                            }


                            QueryNode.positionCloseParenthesis = positionInString;
                        }

                        if (QueryNode.positionOpenParenthesis !== -1 && QueryNode.positionCloseParenthesis !== -1)
                            console.log("(:" + QueryNode.positionOpenParenthesis + ", " + "): " + QueryNode.positionCloseParenthesis)


                        columnError = alfabeto[index];
                        //parenthesis counter, most be a par number
                        if (alfabeto[index].localeCompare("(") === 0)
                            parenthesis[0]++;
                        else if (alfabeto[index].localeCompare(")") === 0)
                            parenthesis[1]++;

                        var labelContent = "";





                        if (currentStateGlobal === 4 || currentStateGlobal === 8) {
                            labelContent = queryTest1.substring(0, queryTest1.indexOf("'"));
                            queryTest1 = queryTest1.substring(queryTest1.indexOf("'"), queryTest1.length);
                            positionInString = positionInString +labelContent.length;
                            setLabelQuery(currentStateGlobal, labelContent);

                        }

                        //se entro a parentesis de keywords
                        if (currentStateGlobal === 6)
                            bndKeywords = true;

                        if(currentStateGlobal === 12)
                            QueryNode.allLabels = true;
                        if (currentStateGlobal === 2)
                            setOperatorOfLabel(alfabeto[index]);

                        setOperatorToQuery(currentStateGlobal, alfabeto[index]);


                        if (alfabeto[index].localeCompare("(") === 0 && !bndKeywords) {
                            tmpQuery.firstLabel = QueryNode.firstLabel;
                            tmpQuery.secondLabel = QueryNode.secondLabel;
                            tmpQuery.notFirstLabel = QueryNode.notFirstLabel;
                            tmpQuery.notSecondLabel = QueryNode.notSecondLabel;
                            tmpQuery.firstOperator = QueryNode.firstOperator;
                            tmpQuery.secondOperator = QueryNode.secondOperator;
                            tmpQuery.operator = QueryNode.operator;
                            tmpQuery.firstKeywords = QueryNode.firstKeywords;
                            tmpQuery.secondKeywords = QueryNode.secondKeywords;
                            tmpQuery.positionOpenParenthesis = QueryNode.positionOpenParenthesis;
                            tmpQuery.positionCloseParenthesis = QueryNode.positionCloseParenthesis;
                            tmpQuery.childQueryNode = QueryNode.childQueryNode;
                            tmpQuery.secondChildQueryNode = QueryNode.secondChildQueryNode;

                            bndTmpQuery = true;

                            QueryNode = newQueryObject();

                        }

                    }


                    indexPositionError = getNewState(currentStateGlobal, queryTest1);
                }
            }
        });
    }

    return indexPositionError;
}

function setOperatorToQuery(currentState,operator) {



    if(currentState === 3)
    {
        if(QueryNode.operator === 0)
            QueryNode.notFirstLabel = false
        else
            QueryNode.notSecondLabel = false;
    }

    if(currentState === 0){
        if(operator.localeCompare("AND")=== 0)
            QueryNode.operator = 2;
        else if(operator.localeCompare("OR")=== 0)
            QueryNode.operator = 1;
        else if (operator.localeCompare("XOR")=== 0)
            QueryNode.operator = 3;
    }




    //si se cierra el parentesis y no es de keywords se crea en nodo hijo para integrar al padre
    if((currentState === 5 || currentState === 10) && operator.localeCompare(")") === 0 && !bndKeywords )
    {
        var childNode = QueryNode;



        if(bndTmpQuery) {
                 QueryNode = {
                firstLabel: tmpQuery.firstLabel,
                secondLabel: tmpQuery.secondLabel,
                notFirstLabel: tmpQuery.notFirstLabel,
                notSecondLabel: tmpQuery.notSecondLabel,
                firstOperator: tmpQuery.firstOperator,
                secondOperator: tmpQuery.secondOperator,
                operator: tmpQuery.operator,
                firstKeywords: tmpQuery.firstKeywords,
                secondKeywords: tmpQuery.secondKeywords,
                positionOpenParenthesis: tmpQuery.positionOpenParenthesis,
                positionCloseParenthesis: tmpQuery.positionCloseParenthesis,
                childQueryNode: tmpQuery.childQueryNode,
                secondChildQueryNode : tmpQuery.secondChildQueryNode
            };

            if(QueryNode.childQueryNode === null && QueryNode.firstLabel === "")
                QueryNode.childQueryNode = childNode;
            else
                QueryNode.secondChildQueryNode = childNode;


 tmpQuery = newQueryObject();

            bndTmpQuery = false;
        }else {
            QueryNode = newQueryObject();

            if(QueryNode.childQueryNode === null  && QueryNode.firstLabel === "")
                QueryNode.childQueryNode = childNode;
            else
                QueryNode.secondChildQueryNode = childNode;

        }
    }

    //ya no esta en los parentesis de keywords
    if(currentState === 10 || currentState === 5)
        bndKeywords= false;
}

function setLabelQuery(currentState,label) {
    if(currentState === 4)
    {
        if(QueryNode.operator === 0)
            QueryNode.firstLabel = label;
        else
            QueryNode.secondLabel = label;
    }


    if(currentState === 8  && bndKeywords)
    {
        if(QueryNode.operator === 0)
            QueryNode.firstKeywords.push(label);
        else
            QueryNode.secondKeywords.push(label);
    }
}

function  setOperatorOfLabel(operator) {
    if(QueryNode.firstOperator === 0 && QueryNode.childQueryNode  === null)
        QueryNode.firstOperator = defineValueOfOperator(operator);
    else
        QueryNode.secondOperator = defineValueOfOperator(operator);
}

function defineValueOfOperator(operator) {
    if(operator === "=")
        return 1;
    else if(operator === alfabeto[15])
        return 2;
    else if(operator === alfabeto[14])
        return 3;
    else if(operator === "<=")
        return 4;
    else if(operator === ">=")
        return 5;
    else if(operator === "NOT")
        return 6;
}

function cleanQueryStructure() {
    queryBuilderStructure={  documents:[],
        queries:[],
        typeSearch :0,
        textToSearch : ""};
}





function cleanAllQueryBuilder() {
    cleanQueryBuilder();
    document.getElementById("queries-builder-table").innerHTML = "";
    cleanQueryStructure();
}

function executeQueryBuilder() {

    document.getElementsByName("documents").forEach(function (inputOfDocument) {
        if(inputOfDocument.checked)
            queryBuilderStructure.documents.push(inputOfDocument.value);
    });
    
    //0-> BY QUERY 1-> BY TEXT
    queryBuilderStructure.typeSearch=0;
    queryBuilderStructure.textToSearch = "";
    annotationTable.innerHTML="";

    contextLoading();
    cleanPolygons();
    clearInputContext();
    cleanFilters("QUERYBUILDER");

    coincidences = getAnnotationsByQueryBuilder(queryBuilderStructure);

    contextLoaded();
   loadContextAndGazetterData(coincidences,true);

}
function executeQueryByCoords() {
    queryBuilt = {
        keyWords: [],
        entitiesRules:[]
    };

    contextLoading();
    queryBuilt.keyWords = keywords;
    queryBuilt.entitiesRules = getEntitiesRules();

    clearInputContext();

    annotationTable.innerHTML="";

    coincidences = getCoincidencesByMap(keywords);

    contextLoaded();
   loadContextAndGazetterData(coincidences,false);

    return queryBuilt;
}
function executeQuery() {
    queryBuilt = {
        keyWords: [],
        entitiesRules:[]
    };

    contextLoading();
    queryBuilt.keyWords = keywords;
    queryBuilt.entitiesRules = getEntitiesRules();

    console.log("filter 2");

    annotationTable.innerHTML="";

    coincidences = runQuery();

    cleanPolygons();
    clearInputContext();
    cleanFilters("QUICKFILTER");

    loadContextAndGazetterData(coincidences,true);
    contextLoaded();

    return queryBuilt;
}

function loadContextAndGazetterData(coincidences,bndFindInMap){
    let contextContent= document.getElementById("contextContent");
    contextContent.innerHTML = "";

    counterContextChunk=1;
    bndLoadingContextChunk = false;
    bndLoadingContextChunkFinished = false;
    $(".top-highlighted").removeClass("top-highlighted");

   // reloadDataTable(coincidences);
    asyncCallLoadContext(coincidences,counterContextChunk);

    if(bndFindInMap) {
        console.log("buscar en mapa");
        var toponymsFiltered = filterToponymsDuplicates(coincidences);
        findCoincidencesInGazetteer(toponymsFiltered);
    }
}

function chunkSubstr(str, size) {

    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
    }

    return chunks;
}

async function asyncCallLoadContext(coincidences,start) {

    let setNumber = 200;
    counterContextChunk = start;
    bndLoadingContextChunk = true;//inicio a cargar el conetxto en pantalla
    $("#btnExportCoincidences").hide();

    var numberAnnotationsActivated = getNumberOfCoincidencesActiviated();


    if (numberAnnotationsActivated >= 200) {
        const result = await appendContextCoincidences(coincidences.length, start, setNumber);


        if (result !== "END") {
            $("#coincidences-progress").html(result + "" + numberAnnotationsActivated + " Matches");
            counterContextChunk++;
        } else {
            bndLoadingContextChunkFinished = true;
            counterContextChunk = 0;
            $("#coincidences-progress").html(numberAnnotationsActivated + " Matches");
        }
    }else {
        reloadContextCoincidences(coincidences,0);
        $("#coincidences-progress").html(numberAnnotationsActivated + " Matches");
        bndLoadingContextChunkFinished = true;
    }

    bndLoadingContextChunk = false;//termino de cargar el contexto en pantalla
    $("#btnExportCoincidences").show();
    reloadDataTable();
}




function appendContextCoincidences(sizeCoincidences,start,setNumber){

    return new Promise(resolve => {
        setTimeout(() => {


                let setToDisplay = start * setNumber;
                if(setToDisplay <= sizeCoincidences) {

                    if(start === 1 ) {
                        console.log("de "+ 0 +" a "+ setNumber);
                        let contextContent= document.getElementById("contextContent");
                        contextContent.innerHTML = "";
                        document.getElementById("annotations-table").innerHTML = "";
                        reloadContextCoincidences(coincidences.slice(0, setNumber),setToDisplay-setNumber);
                    }
                    else {
                        console.log("de "+ (setToDisplay - setNumber) +" a "+ setToDisplay);
                        reloadContextCoincidences(coincidences.slice(setToDisplay - setNumber, setToDisplay),setToDisplay-setNumber);
                    }
                    resolve( setToDisplay + " de ");
                }
                else {
                    console.log("de "+ setToDisplay-setNumber +" a "+ sizeCoincidences);
                    reloadContextCoincidences(coincidences.slice(setToDisplay-setNumber,sizeCoincidences),setToDisplay-setNumber)
                    resolve("END");
                }



        },100);
    });
}


function parseSibling(sibling, i) {
    if (sibling["nodeName"] == "#text") {
        words = sibling["nodeValue"].trim().split()

        i -= words.length;

        return sibling["nodeValue"];
    } else if (sibling["nodeName"] == "SPAN") {
        i -= 1;
        return sibling["outerHTML"];
    } else {
        console.log("UNKNOW NODE");
        return "|";
    }
}

function parseSiblingOnlyText(sibling,i){
    if (sibling["nodeName"] == "#text") {
        words = sibling["nodeValue"].trim().split()

        i -= words.length;

        return sibling["nodeValue"];
    } else if (sibling["nodeName"] == "SPAN") {
        i -= 1;
        return sibling["innerHTML"];
    } else {
        console.log("UNKNOW NODE");
        return "|";
    }
}

function showHTMLContext(relation,leftContext, words, rightContext, elementoToSmooth,relation,entityname,entitycode,labels,index,paragraph,bndTag) {



    var line = document.createElement("tr");

    line.setAttribute("class", "context-coincidence");

    var columnRelation = document.createElement("td");
    columnRelation.setAttribute("class", "title-context-relation");
    columnRelation.innerHTML= relation;
    line.appendChild(columnRelation);


    var columnContextLeft = document.createElement("td");
    var divreverseEllipsis = document.createElement("div");

    divreverseEllipsis.setAttribute("class", "title-context-left ellipsis reverse-ellipsis");
    divreverseEllipsis.innerHTML = "<span>"+leftContext.replaceAll("top-highlighted","")+"</span>";

    columnContextLeft.appendChild(divreverseEllipsis);
    line.appendChild(columnContextLeft);

    var columnKeyWords = document.createElement("td");
    columnKeyWords.setAttribute("class", "title-context-center context-center");
    columnKeyWords.innerHTML = words.replaceAll("top-highlighted","");
    line.appendChild(columnKeyWords);

    var columnContextRight = document.createElement("td");
    columnContextRight.setAttribute("class", "title-context-right ");
   // columnContextRight.setAttribute("class","ellipsis");
    columnContextRight.innerHTML = rightContext.replaceAll("top-highlighted","");
    line.appendChild(columnContextRight);


        line.addEventListener("click", function () {
            if(bndTag)
            elementoToSmooth.scrollIntoView({block: 'start', behavior: 'smooth'});

            showAnnotationInformation(leftContext, words, rightContext, relation, entityname, entitycode, labels, index, paragraph);
        });


    return line;

}


async function reloadContextCoincidences(coincidescesToReload,start) {
    let contextContent= document.getElementById("contextContent");

    var count=1;
    coincidescesToReload.forEach(function(annotation){
        if(annotation.bndInContext) {
            $("div[key='" + annotation["key"] + "'] > p." + annotation["paragraph"] + " > span[index='" + annotation["index"] + "']").addClass("top-highlighted");

        }
    });


    coincidescesToReload.forEach(function (annotation) {
        // Emilio - Cambio

        if(annotation.bndInContext) {
            annElement = $("div[key='" + annotation["key"] + "'] > p." + annotation["paragraph"] + " span[index='" + annotation["index"] + "']")[0];
            if(annotation.color!==null)annElement.classList.add("top-highlighted");

            //console.log("vamos en "+annotation.label);

            let contextLength = $("#contextLenghtSlider").val();

/*
            //Left Context
            leftHTML = "";

            leftSibling = annElement["previousSibling"];
            for (let i = 0; i < contextLength && leftSibling != null; i++) {
                leftHTML = parseSibling(leftSibling, i) + leftHTML;
                leftSibling = leftSibling["previousSibling"];
            }

            //Right Context
            rightHTML = "";

            rightSibling = annElement["nextSibling"];

            for (let i = 0; i < contextLength && rightSibling != null; i++) {
                if (coincidences.includes(rightSibling)) rightSibling.classList.add("top-highlighted");
                {
                    var rightContext = parseSibling(rightSibling, i);
                    if (!rightContext.includes("span"))
                        i += rightContext.split(" ").length - 2;


                    rightHTML += rightContext;

                }
                rightSibling = rightSibling["nextSibling"];

            }
*/

            var paragraphText = getTextOfHtml(annotation["key"],annotation["paragraph"]);

            contextContent.appendChild(showHTMLContext(annotation.relation,getLeftContext(paragraphText.substring(0,annotation.index)), annotation.label, getRightContext(paragraphText.substring(annotation.index+annotation.label.length,paragraphText.length)), annElement, annotation["relation"], annotation.classId.entity, annotation.classId.value, annotation.classId.labels, annotation.index, annotation.paragraph,(annotation.color !== null)));
            count++;

        }

        //Emilio - Cambio
        //count = loadAnnotationResult(annotation,count,contextContent);
    });
}

function loadAnnotationResult(annotation,count,contextContent){

    var corpusContainer = document.getElementById("textCorpus");

    var file = corpusContainer.querySelector("[key='" + annotation.key + "']");

    if($(file).hasClass("paragraph-visible")) {
        loadAnnotationInTable(annotation, count);
        count++;
        let indexOfSearch = annotation.index;
        let paragraph = file.getElementsByClassName(annotation.paragraph)[0];
        let toSearch = annotation.label;
        let paragraphElementText = paragraph.innerHTML;

        if (indexOfSearch !== -1) {

            var rightContext = getRightContext(paragraphElementText.substring(indexOfSearch + toSearch.length, paragraphElementText.length));
            var leftContext = getLeftContext(paragraphElementText.substring(0, indexOfSearch));
            showContextCoincidence(leftContext, annotation.label, rightContext, paragraph, annotation.relation, contextContent);
        }
    }

    return count;
}



var btnValidate = $("#btnValidate");
var btnAddQuery = $("#btnAddQuery");
var bndQuery = false;

$("#btnValidate").click(function (e) {
    validateQueryBulder();
});

function validateQueryBulder(){
    queryTest1 = document.getElementById("queryOfEntity").value;

    validateQuery(queryTest1)
    if(bndQuery)
        btnAddQuery.removeAttr("disabled");
    else {
        document.getElementById("btnAddQuery").disabled = true;
    }
    currentStateGlobal =0;
}

function cleanQueryBuilder(){
    bndQuery= false;
    currentStateGlobal =0;

    var errorElement = document.getElementById("errorValidation");
    errorElement.innerHTML = "";

    document.getElementById("queryOfEntity").value = "";

    document.getElementById("entity").value = "";

    document.getElementById("list-subentities").style.display = "none";
    document.getElementById("list-labels").style.display = "none";
    document.getElementById("uniqueAnnotations").innerHTML ="";
    document.getElementById("entitySubject").innerHTML = "ENTITY NOT YET SELECTED"

}

$("#btnAddQuery").click(function (e) {
    var tmpObjectQuery = {};

   tmpObjectQuery.firstLabel = QueryNode.firstLabel;
    tmpObjectQuery.secondLabel = QueryNode.secondLabel;
    tmpObjectQuery.notFirstLabel = QueryNode.notFirstLabel;
    tmpObjectQuery.notSecondLabel = QueryNode.notSecondLabel;
    tmpObjectQuery.firstOperator = QueryNode.firstOperator;
    tmpObjectQuery.secondOperator = QueryNode.secondOperator;
    tmpObjectQuery.operator = QueryNode.operator;
    tmpObjectQuery.firstKeywords = QueryNode.firstKeywords;
    tmpObjectQuery.secondKeywords = QueryNode.secondKeywords;
    tmpObjectQuery.positionOpenParenthesis = QueryNode.positionOpenParenthesis;
    tmpObjectQuery.positionCloseParenthesis = QueryNode.positionCloseParenthesis;
    tmpObjectQuery.childQueryNode = QueryNode.childQueryNode;
    tmpObjectQuery.entityCode = document.getElementById("entity").value;
    tmpObjectQuery.stringQuery = document.getElementById("queryOfEntity").value;
    tmpObjectQuery.secondChildQueryNode = QueryNode.secondChildQueryNode;
    tmpObjectQuery.allLabels = QueryNode.allLabels;

    document.getElementById("queryOfEntity").value ="";
    document.getElementById("btnAddQuery").disabled = true;

    queryBuilderStructure.queries.forEach(function (query,index) {
        if(query.entityCode === tmpObjectQuery.entityCode) {
            delete queryBuilderStructure.queries[index];
        }
    });

    queryBuilderStructure.queries.push(tmpObjectQuery);
    cleanQueryBuilder();
    
    updateTableQueries();
});

function deleteQueryOfEntity(code) {
    queryBuilderStructure.queries.forEach(function (querie,index) {
        if(querie.entityCode === code)
            delete queryBuilderStructure.queries[index];
    });

    updateTableQueries();
}

function entitySelected(code) {
    var selectSubEntities = document.getElementById("subentities");
    selectSubEntities.innerHTML = "";
    selectLabels.innerHTML = "";

    document.getElementById("uniqueAnnotations").innerHTML ="";

    document.getElementById("entitySubject").innerHTML = "ENTITY = '"+$("#entity :selected").text()+"' WHERE:";


    document.getElementById("entity").value = code;

    document.getElementById("uniqueAnnotations").innerHTML ="";

    var currentQuery = findExistQuery(code);

    if(currentQuery !== "") {
        document.getElementById("queryOfEntity").value = currentQuery;
        bndQuery = false;
        btnAddQuery.removeAttr("disabled");
    }
    else {
        document.getElementById("queryOfEntity").value = "ALL LABELS";
        btnAddQuery.removeAttr("disabled");
    }


    let subentities = getSubEntitiesByEntity(code);
    if(subentities.length>0) {
        //document.getElementById("list-subentities").style.display = "block";
        subentities.forEach(function (subentity) {
            showSubEntitiesInQueryBulder(selectSubEntities, subentity);
            // let subentity = getSubentityByCode(selectSubentities.value);

            if(subentity.labels.length>0){
                document.getElementById("list-labels").style.display = "block";

                subentity.labels.forEach(function (label) {
                    showLabelsInQueryBulder(selectLabels,label);
                });
            }else{
                document.getElementById("list-labels").style.display = "none";
            }
        });
    }else
    {
        document.getElementById("list-subentities").style.display = "none";
        document.getElementById("list-labels").style.display = "none";
        showUniqueAnnotationsOfEntity();
    }


    validateQuery("");
}

function updateTableQueries() {
    var table = document.getElementById("queries-builder-table");
    table.innerHTML = "";
    queryBuilderStructure.queries.forEach(function (query) {
        var line = document.createElement("tr");
        var columnEntityName = document.createElement("td")
        columnEntityName.innerHTML = getEntityByKey(query.entityCode);

        var columnQuery = document.createElement("td")
        columnQuery.innerHTML = query.stringQuery;

        var columnActions = document.createElement("td");

        var actionEdit = document.createElement("i");
        actionEdit.setAttribute("class", "far fa-edit");
        actionEdit.addEventListener("click",function (event) {
           entitySelected(query.entityCode);
        });

        var actionDelete = document.createElement("i");
        actionDelete.setAttribute("class","fas fa-trash");
        actionDelete.style.marginLeft = "5px";
        actionDelete.addEventListener("click",function (event) {
            deleteQueryOfEntity(query.entityCode);
        });

        columnActions.appendChild(actionEdit);
        columnActions.appendChild(actionDelete);



        line.appendChild(columnEntityName);
        line.appendChild(columnQuery);
        line.appendChild(columnActions);

        table.appendChild(line);
    });


}

function checkKeywords(keywords,annotation) {
    var bndKeywords = false;
        if(keywords.length === 0){
            bndKeywords = true;
        }else {
            keywords.forEach(function (annotationToCompare) {
                if(annotationToCompare === annotation)
                    bndKeywords = true;
            });
        }
    return bndKeywords
}

function getResultOfNode(queryEntity,annotation) {
       var bndResult = false;
    //en caso de que no hay mas nodos hijos
    if((queryEntity.childQueryNode === undefined || queryEntity.childQueryNode === null) && (queryEntity.secondChildQueryNode === undefined || queryEntity.secondChildQueryNode === null))
    {
        var first= false; var second = false;
        //solo hay una etiqueta
        if(queryEntity.operator === 0){
            annotation.classId.labels.forEach(function (labelAnnotation) {

                bndResult = getResultOfOperation(queryEntity.firstOperator,labelAnnotation,queryEntity.firstLabel,bndResult);

                if(bndResult)
                    bndResult = checkKeywords(queryEntity.firstKeywords,annotation.label);
            });
        }
        else if(queryEntity.operator === 1){
            annotation.classId.labels.forEach(function (labelAnnotation) {

                first = getResultOfOperation(queryEntity.firstOperator,labelAnnotation,queryEntity.firstLabel,first);


                if(first)
                    first = checkKeywords(queryEntity.firstKeywords,annotation.label);

                second = getResultOfOperation(queryEntity.secondOperator,labelAnnotation,queryEntity.secondLabel,second);


                if(second)
                    second = checkKeywords(queryEntity.secondKeywords,annotation.label);
            });

            if(first || second )
                bndResult = true;


        }
        else if(queryEntity.operator === 2){

            annotation.classId.labels.forEach(function (labelAnnotation) {

                first = getResultOfOperation(queryEntity.firstOperator,labelAnnotation,queryEntity.firstLabel,first);

                if(first)
                    first = checkKeywords(queryEntity.firstKeywords,annotation.label);


                second = getResultOfOperation(queryEntity.secondOperator,labelAnnotation,queryEntity.secondLabel,second);
                if(second)
                    second = checkKeywords(queryEntity.secondKeywords,annotation.label);

            });


            if(first && second )
                bndResult = true;

        }
        else if(queryEntity.operator === 3){
            annotation.classId.labels.forEach(function (labelAnnotation) {


                first = getResultOfOperation(queryEntity.firstOperator,labelAnnotation,queryEntity.firstLabel,first);


                if(first)
                    first = checkKeywords(queryEntity.firstKeywords,annotation.label);

                second = getResultOfOperation(queryEntity.secondOperator,labelAnnotation,queryEntity.secondLabel,second);


                if(second)
                    second = checkKeywords(queryEntity.secondKeywords,annotation.label);

            });

            bndResult = !(!first && !second || first && second);
        }
    }//hay algun nodo hijo
    else if(queryEntity.childQueryNode !== null || queryEntity.secondChildQueryNode !== null) {


            if(queryEntity.childQueryNode !== null)
                first = getResultOfNode(queryEntity.childQueryNode, annotation);
            else {
                annotation.classId.labels.forEach(function (labelAnnotation) {

                    first = getResultOfOperation(queryEntity.firstOperator,labelAnnotation,queryEntity.firstLabel,first);


                    if(first)
                        first = checkKeywords(queryEntity.firstKeywords,annotation.label);
                });
            }

            if(queryEntity.secondChildQueryNode !== null)
                second = getResultOfNode(queryEntity.secondChildQueryNode,annotation);
            else {
                annotation.classId.labels.forEach(function (labelAnnotation) {

                    second = getResultOfOperation(queryEntity.secondOperator,labelAnnotation,queryEntity.secondLabel,second);


                    if(second)
                        second = checkKeywords(queryEntity.secondKeywords,annotation.label);
                });
                //hacerlo con label sola
            }
            bndResult = getResultofOperationNode(queryEntity.operator,first,second);

    }

    return bndResult;
}

function getYearOfDate(date) {
    var temp = date.split('/');
    var d = new Date(temp[2] + '/' + temp[0] + '/' + temp[1]);
    return Number(temp[2]);

}

function getResultOfOperation(operator,labelAnnotation,labelQuery,bnd) {

var yearQuery=0;
    var yearAnnotation=0;
    if(operator === 1 )
    {
       if(labelAnnotation === labelQuery)
           bnd = true;
    }
    else if(operator === 2)
    {
        yearQuery = getYearOfDate(labelQuery);
        yearAnnotation = getYearOfDate(labelAnnotation);
        if(yearQuery !== undefined && yearAnnotation !== undefined)
            if(yearAnnotation < yearQuery)
                bnd = true;
    }
    else if(operator === 3)
    {
        yearQuery = getYearOfDate(labelQuery);
        yearAnnotation = getYearOfDate(labelAnnotation);
        if(yearQuery !== undefined && yearAnnotation !== undefined)
            if(yearAnnotation > yearQuery)
                bnd = true;
    }
    else if(operator === 4)
    {
        yearQuery = getYearOfDate(labelQuery);
        yearAnnotation = getYearOfDate(labelAnnotation);
        if(yearQuery !== undefined && yearAnnotation !== undefined)
            if(yearAnnotation <= yearQuery)
                bnd = true;
    }
    else if(operator === 5)
    {
        yearQuery = getYearOfDate(labelQuery);
        yearAnnotation = getYearOfDate(labelAnnotation);
        if(yearQuery !== undefined && yearAnnotation !== undefined) {
            console.log("Fechas: "+yearQuery + " annotation:"+ yearAnnotation)

            if (yearAnnotation >= yearQuery)
                bnd = true;
        }
    }
    else if(operator === 6){
        if((bnd && labelAnnotation === labelQuery) ||(!bnd && labelAnnotation === labelQuery))
            bnd = false;
        else if(labelAnnotation !== labelQuery)
            bnd = true;


    }


    return bnd;
}

function getResultofOperationNode(operation, first,second) {
   var result=false;

    if(operation === 0){
        result = first;
    }
   else if(operation === 1){
        if(first || second )
            result = true;
   }
   else if (operation === 2){
        if(first && second )
            result = true;
   }
   else if(operation === 3){
        result = !(!first && !second || first && second);
   }

   return result;
}




var stateValidation =0;
function buildQueryString() {

    stateValidation =0;
    validateQueryBulder();
}

function getPositionToInsert(query,cursorPosition) {

    if(query.childQueryNode !== null || query.secondChildQueryNode !== null){

        if(query.secondChildQueryNode !== null){

            var result2 = getPositionToInsert(query.secondChildQueryNode,cursorPosition);
            if(result2!== -2)
                return result2;
            else
                return isInParenthesis(query,cursorPosition);
            // return getPositionToInsert(query.secondChildQueryNode,cursorPosition);
        }else if(query.childQueryNode !== null){
            var result = getPositionToInsert(query.childQueryNode,cursorPosition);
            if(result!== -2)
                return result;
            else
                return isInParenthesis(query,cursorPosition);
        }


    }else
    {
        return isInParenthesis(query,cursorPosition);
    }
  
}

function isInParenthesis(query,cursorPosition) {
    if(query.positionOpenParenthesis !== -1 && query.positionCloseParenthesis !== -1)
    {
        if(cursorPosition > query.positionOpenParenthesis && cursorPosition <= query.positionCloseParenthesis)
        {
            console.log("dentro de : ("+ query.positionOpenParenthesis + " ): "+ query.positionCloseParenthesis);

            if((query.firstLabel !== "" && query.secondLabel !== "") || (query.childQueryNode !== null && query.secondLabel !== "") || (query.childQueryNode !== null && query.secondChildQueryNode !== null) || (query.firstLabel !== "" && query.secondChildQueryNode !== null))
                return query.positionCloseParenthesis;
            else
                return cursorPosition;
        }else {
            return -2;
        }
    }else {
        return cursorPosition+1;
    }
}



function findExistQuery(codeEntity) {
    var query="";
    queryBuilderStructure.queries.forEach(function (querie) {
        if(querie.entityCode === codeEntity)
            query = querie.stringQuery;
    });
    return query;
}

function importQueryFile(e) {
    let jsonReader = new FileReader();
    let jsonFile = e.target.files[0];

    jsonReader.onload = (function(file){
        return function(e) {
            queryBuilderStructure = JSON.parse(e.target.result);
            executeQueryBuilder();
            updateTableQueries();
        }
    })(jsonFile);
    jsonReader.readAsText(jsonFile);
}
