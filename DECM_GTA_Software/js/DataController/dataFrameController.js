let central = [];//tabla con información central de cada una de las etiquetas
let centralByText = [];
let entities = [];//tabla de las entidades principales
let subEntities = [];

let gazetteer = [];

let documents =[];

let queries = [];//tabla de queries a procesar


///////////////////////////OPERACIONES CON LAS PALABRAS CLAVE/////////////////////////
function addToTableKeyWords(keyRelation,nameRelation, keyWords, index, entity, paragraph, color){
        central.push({
            key: keyRelation,
            relation:nameRelation,
            index: index,
            label: keyWords,
            wordsCount: keyWords.split(" ").length,
            classId: entity,
            paragraph: paragraph,
            color: color,
            bndInContext:true
        });
}

function getCoincidencesByKeyWord(){
    return centralByText;
}

function cleanCoincidencesByKeyWord(){
    centralByText = [];
}

function addCoincidenceByKeyWord(keyRelation,nameRelation, keyWords, index, paragraph){
    centralByText.push({
        key: keyRelation,
        relation:nameRelation,
        index: index,
        label: keyWords,
        wordsCount: keyWords.split(" ").length,
        classId: createEntity(null,[]),
        paragraph: paragraph,
        color: null,
        bndInContext:true
    });
}

function createEntity(entity, fields) {
    var labels = [];

    var entityObject = null;

    if(entity!==null)
    {
        entityObject = {
            value: entity,
            entity: getEntityByKey(entity),
            labels: labels
        };
    }else
    {
        entityObject = {
            value: "empty",
            entity: "empty",
            labels: labels
        };
    }

    var attributeLabel;

    for (attributeLabel in fields) {
        entityObject.labels.push(fields[attributeLabel].value);
    }

    return entityObject;
}



function runFilterByKeyword(keyword){
    return central.filter(function (annotation){
        var result = false;
        if(annotation.label.toLowerCase().includes(keyword.toLowerCase()))
            result = true;

        return result;
    });
}



function filterToponymsDuplicates(coincidencesToFilter){
    var coincidencesFiltered = [];
    coincidencesToFilter.filter(function (annotation){
        if($.inArray(annotation.label.toLowerCase(),coincidencesFiltered) === -1) {
            if ($.inArray("toponym", annotation.classId.labels) === 0)
                coincidencesFiltered.push(annotation.label.toLowerCase());

        }
    });

    return coincidencesFiltered;
}

function runQuery() {
    return central.filter(function (annotation) {
        var result = false;
        annotation.bndInContext = true;
        queryBuilt.entitiesRules.forEach(function (entityRule) {
            if(annotation.classId.value.toLowerCase() === entityRule.keyEntity.toLowerCase()) {
                //result = true;

                entityRule.subentities.forEach(function (keySubentity) {
                    annotation.classId.labels.forEach(function (labelAnnotation) {
                        if(keySubentity.toLowerCase() === labelAnnotation.toLowerCase())
                            
                        result = true;
                    });
                });
            }
        });

        return result;
    });
}

function getAnnotationsByQueryBuilder(queryBuilderStructure) {

    return central.filter(function(annotation) {
        var bnd = false;
        annotation.bndInContext = true;
        queryBuilderStructure.queries.forEach(function (queryEntity) {
            if (annotation.classId.value.toLowerCase() === queryEntity.entityCode.toLowerCase())
            {


                if(queryEntity.allLabels)
                    bnd = true;
                else
                    bnd= getResultOfNode(queryEntity,annotation);


            }
        });
        return bnd;
    });
}

function getUniqueAnnotations(entityCode,label) {

  var index = [];
    var all =[];
    all = central.filter(function (annotation) {
        var bnd = false;
        if(annotation.classId.value === entityCode){
            if(label !== "" && label !== null)
            {
                annotation.classId.labels.forEach(function (labelAnnotation) {
                    if(labelAnnotation === label) {

                        bnd = true;
                    }
                });
            }else
                bnd= true;

            return bnd;
        }
    });

    all.forEach(function (uniqueAnnotation) {
        if(index.filter(function (uniqueAnnotationInList) {
            return uniqueAnnotationInList === uniqueAnnotation.label;
        }).length === 0)
            index.push(uniqueAnnotation.label);
    });

    return index;
   // return central.filter((annotation) => annotation.classId.value === entityCode);
}




function getUniqueAnnotationsOfEntity(entityCode) {

    var index = [];
    var all =[];
    all = central.filter(function (annotation) {
        var bnd = false;
        if(annotation.classId.value === entityCode){
            bnd = true;
        }

        return bnd;
    });

    //filtrar repeticiones
    all.forEach(function (uniqueAnnotation) {
        if(index.filter(function (uniqueAnnotationInList) {
            return uniqueAnnotationInList === uniqueAnnotation.label;
        }).length === 0)
            index.push(uniqueAnnotation.label);
    });

    return index;
}

function getCoincidencesByMap(keywords) {
    return central.filter(function (annotation) {
        var bnd = false;
        annotation.bndInContext= true;
        keywords.forEach(function (keywordMap) {
            if(annotation.label.toLowerCase() === keywordMap.toLowerCase())
                bnd= true;
        });

        return bnd;
    });
}

function getCoincidences(entities, keyWords) {
    var caseQuery= 0;
    var query;
    if (entities.length > 0 && keyWords.length > 0) {
        query = {
            classId: entities,
            label: keyWords
        };
        caseQuery=0;
    }else if(entities.length > 0 && keyWords.length === 0){
        query = {
            classId: entities
        };
        caseQuery=1;
    }else if(entities.length === 0 && keyWords.length > 0){
        query = {
            label: keyWords
        };
        caseQuery=2;
    }


    return central.filter(function(item) {
        var bnd = false;
        var bndKeyWord = false;
        for (var key in query) {

            if(key === "classId"){
                query[key].forEach(function (entity)
                 {
                     if(entity.labels.length === 0) {
                         if (item[key].value.toLowerCase() !== undefined && item[key].value.toLowerCase() === entity.value.toLowerCase())
                             bnd = true;
                     }else
                     {

                        entity.labels.forEach(function (label) {

                             item[key].labels.forEach(function (labelToCompare) {
                                 if (item[key].value.toLowerCase() !== undefined && item[key].value.toLowerCase() === entity.value.toLowerCase() && labelToCompare.includes(label))
                                     bnd = true;
                                 }
                             );

                         });

                     }

                });
            }


                /*if (item[key].toLowerCase() === undefined || item[key].toLowerCase() != query[key].toLowerCase())
                    bnd = false;


                 */

            if(key === "label" ){


                query[key].forEach(function (keyWord) {
                    if(item[key].toLowerCase() !== undefined && item[key].toLowerCase() === keyWord.toLowerCase())
                        bndKeyWord = true;
                });

            }
        }

        if(caseQuery===0) {
            if (bnd && bndKeyWord)
                return true;
        }else if (caseQuery === 1){
            return bnd;
        }else if (caseQuery === 2){
            return bndKeyWord;
        }
    });
}


function getAnnotations() {
  return central;
}

function getRightToponym(index, paragraph, relation)
{
    return central.filter(function (annotation){
       bnd = false;

       if ($.inArray("toponym", annotation.classId.labels) === 0)
       {
           if(annotation.relation === relation && annotation.paragraph === paragraph && annotation.index > index)
               bnd = true
       }
       return bnd;
    });
}

function getLeftToponym(index, paragraph, relation)
{
    return central.filter(function (annotation){
        bnd = false;

        if ($.inArray("toponym", annotation.classId.labels) === 0)
        {
            if(annotation.relation === relation && annotation.paragraph === paragraph && annotation.index < index)
                bnd = true
        }
        return bnd;
    });
}

function getAnnotationsByEndIndex(keyDocument,paragraph,startIndex, endindex){
    let result =[];
    let annotationsSameEndIndex = central.filter(function (annotation){
        if(keyDocument === annotation.key && paragraph === annotation.paragraph && endindex === (annotation.index + annotation.label.length))
            return true;
    });

    let bndSameIndex = true;
    annotationsSameEndIndex.forEach(function (annotation,index){
        if(annotation.label === annotationsSameEndIndex[0].label && index >0 ) {
            bndSameIndex = false;
        }

    });

    if(bndSameIndex)
     return annotationsSameEndIndex;
    else
        return [];

}

function getNumberOfCoincidencesActiviated(){
    var counter =0;
    coincidences.filter(function (annotation){
        if(annotation.bndInContext)
            counter++;
    });

    return counter;
}

function resetShowingStatusCoincidesces(){
    coincidences.filter(function (annotation){
        annotation.bndInContext = true;
    });
}
////////////////////////OPERACIONES CON EL GAZETTEER/////////////////////////////
function addGazetteerPoint(id,keywords, lat, lng,country,county,relation, alt, marker, types, titleReference,pages,volumen,tome,author) {
    gazetteer.push({
        id: id,
        keyWords: keywords,
        latitude: lat,
        longitude: lng,
        altitude: alt,
        activate: true,
        marker: marker,
        types: types,
        country:country,
        county:county,
        relations: relation,
        reference: titleReference,
        pages: pages,
        volumen: volumen,
        tome: tome,
        author: author

    });
}

function getAllMarkersGazetteer() {
    return gazetteer;
}

function getMarkersByRelation(key) {
    return  gazetteer.filter((annotation) => annotation["relations"] === key);
}


function getToponymsByDocuments(annotations){
    var titleToponyms = [];
    annotations.forEach(function (annotation){
        var toponym = searchAToponymInTitle(annotation.relation);
        if(toponym!==null && titleToponyms.indexOf(toponym.toLowerCase())===-1)
            titleToponyms.push(toponym.toLowerCase());
    });

    return titleToponyms;
}

function clearGazetteer() {
    gazetteer = [];
}





/////////////////////OPERACIONES CON LAS ENTIDADES /////////////////////////////////////////
//asignación de color de las entidades
function getColor(){

    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}


//Operaciones con las entidades de catalago
function getColorOfEntity(codeEntity) {

    let coincidencesEntity = entities.filter((annotation) => annotation["code"] == codeEntity);

    return coincidencesEntity[0]["color"];
}

function setNewEntity(key, value) {
    let entityColor = getColor();

    entities.push({
        entity: value,
        color: entityColor,
        code: key
    });
}

function getEntityByKey(key) {
    let coincidencesEntity = entities.filter((annotation) => annotation["code"] == key);
    return coincidencesEntity[0]["entity"];
}

function getEntityByName(name) {
    let coincidencesEntity = entities.filter((annotation) => annotation["entity"] === name);
    return coincidencesEntity[0];
}


function getEntities() {
    return entities;
}


////Operaciones con las subentidades
function setNewSubEntity(key, value){
    subEntities.push({
        subentity: value,
        keyEntity: "",
        labels: [],
        code: key
    });
}

function setLabelToSubEntity(entityKey,subEntityKey,label) {
    let coincidencesSubEntity = subEntities.filter((annotation) => annotation["code"] == subEntityKey);
    if(coincidencesSubEntity.length == 1){
       if(coincidencesSubEntity[0].keyEntity === "")
       coincidencesSubEntity[0].keyEntity = entityKey;

        var labelsActually = coincidencesSubEntity[0]["labels"];

        var bndLabelExist=false;
        labelsActually.forEach(function (labelInList) {
            if(labelInList === label)
                bndLabelExist =true;
        });
        if(!bndLabelExist)
            coincidencesSubEntity[0]["labels"].push(label);
    }
}


function getSubEntities() {
    return subEntities;
}

function getSubentityByCode(code) {
    return subEntities.filter((annotation) => annotation["code"] === code)[0];
}

function getSubEntitiesByEntity(entityCode ) {
    return subEntities.filter((annotation) => annotation["keyEntity"] === entityCode);
}


var annotationsToExport = [] ;

function existsToponymsInDocument(key){
    var bnd =false;
    central.filter(function (annotation){
        if(annotation.key === key && $.inArray("toponym", annotation.classId.labels) === 0)
            bnd = true;
    });

    return bnd;
}

var beforeDoc = "";
var docHaveToponyms = false;
function addAnnotationToExport(annotation,type){

    var paragraphText = getTextOfHtml(annotation["key"],annotation["paragraph"]);
    var numberParagraphs = getParagraphCount(annotation["key"]);
    console.log(annotation.relation);
    if(annotation.key !== beforeDoc) {
        beforeDoc = annotation.key;
        docHaveToponyms = existsToponymsInDocument(annotation.key);
    }
     var objectCSVToExport ={};
     var objectJSONToExport= {};
    if(type.includes("csv")) {
        objectCSVToExport = {
            document: annotation.relation,
            index: annotation.index,
            entityCode: annotation.classId.value,
            entity: annotation.classId.entity,
            labels: annotation.classId.labels,
            paragraph: annotation.paragraph,
            leftContext: getLeftContext(paragraphText.substring(0, annotation.index)),
            KWC: annotation.label,
            rightContext: getRightContext(paragraphText.substring(annotation.index + annotation.label.length, paragraphText.length))
        };


        getReferencesByDocumentTitle(annotation.relation).forEach(function (reference,index){
            objectCSVToExport["REF"+(index+1)+"_DOC_PLACE"] = reference.keyWords;
            objectCSVToExport["REF"+(index+1)+"_DOC_LAT"] = reference.latitude;
            objectCSVToExport["REF"+(index+1)+"_DOC_LNG"] = reference.longitude;
            objectCSVToExport["REF"+(index+1)+"_DOC_BIBLIO"] = reference.author+", "+ reference.reference+ ", Vol: "+ reference.volumen + ", Tome: "+ reference.tome+ ", Pages:"+reference.pages;

        });

        if(docHaveToponyms) {
            var leftReference = getLeftReferenceInGazetteer(annotation.index, annotation, annotation.paragraph, annotation.index);
            if (leftReference !== null) {
                objectCSVToExport["REF_KWC_Left_PLACE"] = leftReference.keyWords;
                objectCSVToExport["REF_KWC_Left_LAT"] = leftReference.latitude;
                objectCSVToExport["REF_KWC_Left_LNG"] = leftReference.longitude;
                objectCSVToExport["REF_KWC_Left_BIBLIO"] = leftReference.author + ", " + leftReference.reference + ", Vol: " + leftReference.volumen + ", Tome: " + leftReference.tome + ", Pages:" + leftReference.pages;
            } else {
                objectCSVToExport["REF_KWC_Left_PLACE"] = "Unknown";
                objectCSVToExport["REF_KWC_Left_LAT"] = "Unknown";
                objectCSVToExport["REF_KWC_Left_LNG"] = "Unknown";
                objectCSVToExport["REF_KWC_Left_BIBLIO"] = "Unknown";
            }

            var rightReference = getRightReferenceInGazetteer(annotation.index, annotation, annotation.paragraph, numberParagraphs);
            if (rightReference !== null) {
                objectCSVToExport["REF_KWC_Right_PLACE"] = rightReference.keyWords;
                objectCSVToExport["REF_KWC_Right_LAT"] = rightReference.latitude;
                objectCSVToExport["REF_KWC_Right_LNG"] = rightReference.longitude;
                objectCSVToExport["REF_KWC_Right_BIBLIO"] = rightReference.author + ", " + rightReference.reference + ", Vol: " + rightReference.volumen + ", Tome: " + rightReference.tome + ", Pages:" + rightReference.pages;
            } else {
                objectCSVToExport["REF_KWC_Right_PLACE"] = "Unknown";
                objectCSVToExport["REF_KWC_Right_LAT"] = "Unknown";
                objectCSVToExport["REF_KWC_Right_LNG"] = "Unknown";
                objectCSVToExport["REF_KWC_Right_BIBLIO"] = "Unknown";
            }

            getReferencesByToponym(annotation.relation, annotation.label, annotation.classId.labels).forEach(function (reference, index) {
                objectCSVToExport["REF" + (index + 1) + "_Toponym_PLACE"] = reference.keyWords;
                objectCSVToExport["REF" + (index + 1) + "_Toponym_LAT"] = reference.latitude;
                objectCSVToExport["REF" + (index + 1) + "_Toponym_LNG"] = reference.longitude;
                objectCSVToExport["REF" + (index + 1) + "_Toponym_BIBLIO"] = reference.author + ", " + reference.reference + ", Vol: " + reference.volumen + ", Tome: " + reference.tome + ", Pages:" + reference.pages;

            });

        }
        annotationsToExport.push(objectCSVToExport);
    }else {
        objectJSONToExport = {
            document: annotation.relation,
            index: annotation.index,
            entityCode: annotation.classId.value,
            entity: annotation.classId.entity,
            labels: annotation.classId.labels,
            paragraph: annotation.paragraph,
            leftContext: getLeftContext(paragraphText.substring(0,annotation.index)),
            KWC: annotation.label,
            rightContext: getRightContext(paragraphText.substring(annotation.index+annotation.label.length,paragraphText.length)),
            references: getReferencesByToponym(annotation.relation,annotation.label, annotation.classId.labels)
        };
        annotationsToExport.push(objectJSONToExport);
    }
}
function setReferenceToDocument(){

}

function getReferencesByToponym(relation,toponymToSearch,labels){
    var referencesLocated=[];

    if($.inArray("toponym", labels) === 0){

        referencesLocated = getReferencesByToponymName(toponymToSearch);
    }

    return referencesLocated;
}

function getReferencesByDocumentTitle(relation)
{
    var referencesLocated=[];

    var toponymTitle = searchAToponymInTitle(relation);

    if(toponymTitle!==null) {
        referencesLocated = getReferencesByToponymName(toponymTitle);
    }

    return referencesLocated;
}

function getRightReferenceInGazetteer(index,annotation,paragraph, numberParagraphs){
    var rightToponyms = getRightToponym(index, paragraph, annotation.relation);
    var rightReference= null;


    for (var j = 0; j < rightToponyms.length; j++){
        var toponym = rightToponyms[j];
        var references =getReferencesByToponymName(toponym.label);

         if(references.length > 0) {
             rightReference = references[0];
             break;
         }
     }

    if(rightReference !== null)
        return rightReference;
    else {
        var paragraphParts = paragraph.split("p");
        if(parseInt(paragraphParts[1]) <=  numberParagraphs) {
            var nextParagraph = paragraphParts[0] +"p"+ (parseInt(paragraphParts[1]) + 1); // next paragraph
            return getRightReferenceInGazetteer(0, annotation, nextParagraph, numberParagraphs);
        }
        else
            return null;
    }
}

function getLeftReferenceInGazetteer(index,annotation, paragraph, indexLastAnnotation){

    if(index !== indexLastAnnotation)
        index = indexLastAnnotation;

    var toponyms = getLeftToponym(index, paragraph, annotation.relation);
    var reference= null;

    for (var j = toponyms.length-1; j >= 0; j--){
        var toponym = toponyms[j];
        var references =getReferencesByToponymName(toponym.label);

        if(references.length > 0) {
            reference = references[0];
            break;
        }
    }

    if(reference !== null){
        return reference;
    }
    else {
        var paragraphParts = paragraph.split("p");
        if(parseInt(paragraphParts[1]) >=  1) {
            var beforeParagraph = paragraphParts[0] +"p"+ (parseInt(paragraphParts[1]) - 1); // before paragraph

                var lastIndex = getLastAnnotationOfParagraph(annotation["key"], beforeParagraph).attr("index");

                return getLeftReferenceInGazetteer(annotation.index, annotation, beforeParagraph, lastIndex+1);

        }
        else
            return null;
    }
}

function getReferencesByToponymName(toponymToSearch){
    var referencesLocated=[];

        gazetteer.filter(function (toponym){
            if(toponym.keyWords.toLowerCase()  === toponymToSearch.toLowerCase()  && !idRepeatInList(referencesLocated,toponym.id))
            {

               // if(existReference(referencesLocated,toponym.keyWords)) {
                    referencesLocated.push({
                        id: toponym.id,
                        keyWords: toponym.keyWords,
                        latitude: toponym.latitude,
                        longitude: toponym.longitude,
                        altitude: toponym.altitude,
                        lenguaje: toponym.lenguaje,
                        translation: toponym.translation,
                        country: toponym.country,
                        estate: toponym.estate,
                        county: toponym.county,
                        comment: toponym.comment,
                        reference: toponym.reference,
                        confidence: toponym.confidence,
                        typeName: toponym.typeName,
                        pages: toponym.pages,
                        volumen: toponym.volumen,
                        tome: toponym.tome,
                        author: toponym.author
                    });
                //}
            }
        });

    return referencesLocated;
}

function existToponym(toponymToSearch){
    return gazetteer.some(toponym => toponym.keyWords.toLowerCase() === toponymToSearch.toLowerCase());
}

function idRepeatInList(references,id){
    return references.some(reference => reference.id === id);
}

function existReference(references, toponym)
{

    // Find if the array contains an object by comparing the property value
    if (references.length === 0){
        return true;
    }
    else return !references.some(reference => reference.keyWords.toLowerCase() === toponym.toLowerCase());
}

function getAnnotationsToExport(){
    return annotationsToExport;
}


/////////RELATION DOCUMENTS//////////////////////////////
function getNameOfRelation(code){
    return documents.filter((relation) => relation["key"] === code)[0];
}

function getAnnotationsOfRelation(code){
    return central.filter((annotation) => annotation["key"] === code);
}
