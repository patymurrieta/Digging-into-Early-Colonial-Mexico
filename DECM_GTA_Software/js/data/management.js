
let annotations = {};
let annotationSourceFiles = [];
let pendingFiles = 0;
let  pendingFilesProcessed=0;
let indexesBreaksLines = [];
var tagsToSameEndIndex =[];

let NOT_LABELLED = "Not Labelled";

function processInputFiles(){
  inputFiles.forEach(file => {
    if (file.name.endsWith(".html")){
      pendingFiles ++;
      processHTMLFile(file);
    } else if (file.name == "annotations-legend.json") {
      processEntitiesCatalogFile(file);
      showProgress(shortNameTagTogFile(file.name));
    } else if (file.name.endsWith(".json")){
      annotationSourceFiles.push(file);
    } else if (file.name.endsWith(".txt")){
      pendingFiles ++;
      processTXTFile(file);
    }


  });
  var containerOfDocumentsList = document.getElementById("documents-table");
  containerOfDocumentsList.innerHTML = "";
  waitForProcessingAnnotations();

 // RefreshGazetteer();
}

function waitForProcessingAnnotations(){
  console.log("first processing: ", pendingFiles);
  if (pendingFiles == 0){
    processAnnotationFiles();
  } else setTimeout(waitForProcessingAnnotations, 500);
}

function waitForDisplayingDashboard(){
  console.log("second processing: ", pendingFiles);
  if (pendingFiles == 0){
    $("#corpus-loader").css("display", "none");
  } else setTimeout(waitForDisplayingDashboard, 500);
}

function showProgress(nameFile)
{
  pendingFilesProcessed++;
  $("#numberProgress").text(pendingFilesProcessed+" of "+ inputFiles.length +" files");
  $("#processingRelation").text(splitRelationName(nameFile.replaceAll("_"," ")));

  var percentageComplete =(pendingFilesProcessed/inputFiles.length) *100;
  $("#percentProgress").text(parseInt(percentageComplete));
  var strokeDashOffsetValue = 440 - (percentageComplete * 440) /100;
  var progressBar = $("#circlePercentProgress");
  progressBar.css("stroke-dashoffset",strokeDashOffsetValue);
  if(pendingFilesProcessed === inputFiles.length)
      waitForDisplayingDashboard();

}

function processAnnotationFiles(){
  annotationSourceFiles.forEach((file, i) => {

    processJSONFile(file);
   console.log("[JSON] PROCESSING: ",file.name);

    //addLabels(file, currentCorpusFragmentKey);
  });

}

function processTXTFile(file){
  let reader = new FileReader();
  reader.onload = (function(file){

      return function(e) {
        processCorpusFragment(shortNameTagTogFile(file.name), e.target.result,1,null); // tipo de archivo txt 1
        pendingFiles --;
        showProgress(shortNameTagTogFile(file.name));
      }
  })(file);
  reader.readAsText(file);
}

function processHTMLFile(file){
  
  let reader = new FileReader();
  reader.onload = (function(file){
    console.log("[HTML] processing: ", file.name);

    return function(e) {
        var parser = new DOMParser();
        doc = parser.parseFromString(e.target.result, "text/html");
// returns a HTMLDocument, which also is a Document.


        var pre = doc.getElementsByTagName("pre")[0];

        let key = buildRandomKey(4);
        window.dispatchEvent(new Event('resize'));

        if(pre === undefined || pre === null)
        {
            var paragraphs = doc.getElementsByTagName("p");


            paragraphs.forEach(function (paragraph) {
                var text = paragraph.textContent;

                text = text.replace(/[\u00AD\u002D\u2011]+/g, '-');//reemplazar el caracter vacio

                var part = paragraph.getAttribute("id")

                searchIndexBreaksLines(text, 0);
                processCorpusFragment(shortNameTagTogFile(file.name), text, 2, part,key);//tipo de archivo html (2)
            });


        }else
        {
            var text =pre.textContent;

            text = text.replace(/[\u00AD\u002D\u2011]+/g,'-');//reemplazar el caracter vacio

            var part = pre.getAttribute("id")

            searchIndexBreaksLines(text,0);
            processCorpusFragment(shortNameTagTogFile(file.name),text,2,part,key);//tipo de archivo html (2)

        }

        isCorpusProcessed = true;

        pendingFiles --;
      showProgress(shortNameTagTogFile(file.name));
      }
  })(file);
  reader.readAsText(file);
}

function processEntitiesCatalogFile(file){
  let reader = new FileReader();
  reader.onload = (function(file){
    console.log("[Annotations] processing: ", file.name);
      return function(e) {
        buildEntitiesCatalog(JSON.parse(e.target.result));
      }
  })(file);
  reader.readAsText(file);
}

function processJSONFile(file){
  let reader = new FileReader();
  reader.onload = (function(file){
      return function(e) {
        let nameFile = shortNameTagTogFile(file.name);
        let nameForFindingKey =""; //file.name.substring(0, file.name.lastIndexOf("."));
        if(nameFile.includes(".txt.ann"))
          nameForFindingKey =nameFile.substring(0, nameFile.lastIndexOf(".ann.json"))+".plain";
        if(nameFile.includes(".ann"))
            nameForFindingKey = nameFile.substring(0, nameFile.lastIndexOf(".ann.json"))+".plain";
      else
         nameForFindingKey = nameFile.substring(0, nameFile.lastIndexOf("."));

      console.log("Bucando llave:" + nameForFindingKey);
      var documentKey = corpusFramentsKeys[nameForFindingKey];

      //if(documentKey === undefined || documentKey === null)
         console.log(corpusFramentsKeys);


        buildAnnotations(nameFile, JSON.parse(e.target.result), documentKey);
        showProgress(shortNameTagTogFile(file.name));
      }
  })(file);
  reader.readAsText(file);
}

function buildEntitiesCatalog(ann){
  for(var key in ann){
    if(key.includes("e")) {
      setNewEntity(key, ann[key]);
      setNewSubEntity(key+"n_l",NOT_LABELLED);//agrega un subentity de no etiquetado para cada entidad
    }
    else if(key.includes("f"))
      setNewSubEntity(key,ann[key]);
  }



  showEntities();
}

function buildAnnotations(fileName, json, key){




  fileName = splitRelationName(fileName);
  currentCorpusFragmentKey = corpusFramentsKeys[fileName];
  annotations[fileName] = {};
  json["entities"].forEach((item, i) => {
    let currentDocument = annotations[fileName];
    let annParagraph = item["part"];
    if(!currentDocument.hasOwnProperty(annParagraph))
      currentDocument[annParagraph] = [];
    let start = item["offsets"][0]["start"];
    let word = item["offsets"][0]["text"].replace(/[\u00AD\u002D\u2011]+/g,'-');


    let tmpEntity = item["classId"];
    let endIndex = start + word.length;



    var entity= createEntity(tmpEntity,item.fields);



    if (currentDocument[annParagraph][start] == undefined)
      currentDocument[annParagraph][start] = {};
    if (!currentDocument[annParagraph][start].hasOwnProperty("" + endIndex))
      currentDocument[annParagraph][start][endIndex] = [];

    if(entity.labels.length>0){
      currentDocument[annParagraph][start][endIndex].push(
          {
            index: start,
            closedTag: false,
            endIndex: start+ word.length,
            paragraph: annParagraph,
            word: word,
            entity: item["classId"],
            labels: Object.keys(item["fields"]).map(
                function(keyLabel){
                  return { id: keyLabel, value: item["fields"][keyLabel]["value"] }
                }
            )
          }
      );
    }else {
      currentDocument[annParagraph][start][endIndex].push(
          {
            index: start,
            closedTag: false,
            endIndex: start+ word.length,
            paragraph: annParagraph,
            word: word,
            entity: item["classId"],
            labels: [{ id: tmpEntity+"n_l", value: NOT_LABELLED }]
          }
      );
    }

    currentDocument[annParagraph][endIndex] = "END";

    if(entity.labels.length===0) {
      entity.labels.push(NOT_LABELLED);
    }

    addToTableKeyWords(key,fileName,word,start,entity,annParagraph,getColorOfEntity(tmpEntity));

  });

   //addDocumentToList
  documents.push({ name: fileName,
    key: key});
  
  splitDocument(annotations[fileName], key);
  uploadSubEntities();

  fixAnnotationsJoined(key,tagsToSameEndIndex)

}




function splitDocument(annSet, key){
  for(partKey in annSet){
    let part = annSet[partKey];
    let textContent = $("div[key|='" + key + "']>." + partKey).text();


    let lastIndex = textContent.length;


    let injectedParagraph = "";

    //textContent = textContent.substring(0,45) + "\n\n" + textContent.substring(45,textContent.length);
     var currentAnn= null;
    for(var i = part.length-1; i >= 0; i--) {
      let tagContent = "";
      var tagDomElement;



      if (part[i] == "END" ){

        tagContent = buildClosingAnnotationTag(currentAnn,key);
        currentAnn = null;
      }
      else if(typeof(part[i]) == "object") {
        struct = part[i];
        currentAnn = struct[Object.keys(struct)[0]][0];
        tagContent = buildOpenAnnotationTag(currentAnn, i,key,partKey);
      }

      //injectedParagraph = tagContent
        injectedParagraph = tagContent
        + textContent.substring(i, lastIndex)
        + injectedParagraph;

      lastIndex = i;

    }
    injectedParagraph = textContent.substring(0, lastIndex) + injectedParagraph;
   $("div[key|='" + key + "']>." + partKey).html(injectedParagraph.replaceAll("\n","<br/>"));
   // $("div[key|='" + key + "']>." + partKey).html(injectedParagraph);
  }
}

function fixAnnotationsJoined(key,tagsToFix){
  tagsToFix.forEach(function (tagsSameEndIndex,index){


      var firstTag = tagsSameEndIndex[0];
      var lastTag = tagsSameEndIndex[1];
      tagsToSameEndIndex.forEach(function (tag, index) {
        if (index > 0) {
          if (tag.index < firstTag.index)
            firstTag = tag;

          if (tag.index > lastTag.index)
            lastTag = tag;
        }
      });

      var paragraph = $("div[key='" + firstTag["key"] + "'] > p." + firstTag["paragraph"]);
      var span = $("div[key='" + firstTag["key"] + "']> p." + firstTag["paragraph"] + " > span[index='" + firstTag["index"] + "']");
      if (span.html() !== null && span.html() !== undefined) {

        var indexOfSpan = paragraph.html().toString().indexOf('index="' + firstTag["index"] + '"');

        var sizeOfSpanContent = span.html().toString().length;
        var endOfTagSpan = paragraph.html().toString().indexOf(">", indexOfSpan);
        var startOfSpanIndex = paragraph.html().toString().substring(0, indexOfSpan).lastIndexOf("<span");

        var endOfSpenIndex = paragraph.html().toString().indexOf("</span>", endOfTagSpan + sizeOfSpanContent) + 7;



        var startParagraph = paragraph.html().toString().substring(0, startOfSpanIndex);
        var indexOfSpanEnd = paragraph.html().toString().indexOf('index="' + lastTag["index"] + '"');
        var endOfSpanIndexEnd = paragraph.html().toString().indexOf("</span>", indexOfSpanEnd);

        if(endOfSpenIndex >= endOfSpanIndexEnd) {
          var textToFixStart = paragraph.html().toString().substring(startOfSpanIndex, endOfSpanIndexEnd);
          var textToFixEnd = paragraph.html().toString().substring(endOfSpanIndexEnd, endOfSpenIndex - 7);

          var partFixed = textToFixStart + "</span>" + textToFixEnd;
          var endParagraph = paragraph.html().toString().substring(endOfSpenIndex, paragraph.html().toString().length);
          var paragraphFixed = startParagraph + partFixed + endParagraph;


          paragraph.empty();
          paragraph.html(paragraphFixed);
        }
      } else {
        console.log("TAG SAME INDEX ERROR");
        console.log(tagsSameEndIndex);
      }

  });



}

function buildOpenAnnotationTag(currentAnn, labelIndex,relationCode,paragraph){
 // currentAnn = struct[Object.keys(struct)[0]][0];
  var labels = "";
  currentAnn["labels"].forEach((item, i) => {
    setLabelToSubEntity(currentAnn["entity"],item["id"],item["value"]);
    if(labels !== "")
      labels += ",";
    labels += item["value"];
  });

  return  "<span class='annotated'"
      +"onclick='searchAnnotation(this)'"
      +"ondblclick='searchAnnotationMatches(this)'"
    + " entity='" + currentAnn["entity"] + "' index='" + labelIndex +  "' relation='" + relationCode + "'" +  " labels='" + labels + "'" +  "' paragraph='" + paragraph + "'"
    + " style='background-color:" + getColorOfEntity(currentAnn["entity"]) +  "' "
      + ">";

}



function buildClosingAnnotationTag(currentAnn,key){
  var htmlEndTag = "";
  if(currentAnn!== null)
  {
    var annotacionToClose = getAnnotationsByEndIndex(key,currentAnn.paragraph,currentAnn.index,currentAnn.endIndex);


    if(annotacionToClose.length >1)
    {

      tagsToSameEndIndex.push(annotacionToClose);
      annotacionToClose.forEach(function (annotation){

        htmlEndTag += "</span>";
      });
    }else
      htmlEndTag = "</span>";


  }else
    htmlEndTag = "</span>";

    return htmlEndTag;
}

function searchIndexBreaksLines(text,start){
  if(text !== null && text.length > 0  ) {

      let index = text.indexOf("\n",start);
      if (index >=0) {
        indexesBreaksLines.push(index);
        searchIndexBreaksLines(text,index+1);
      }
  }
}

function shortNameTagTogFile(fullName){
  let indexSeparator= fullName.indexOf("-");

  if(indexSeparator === 28)
    return fullName.substring(29);//uno mas por que el valor devuelto por indexof es de 29-1
  else
    return fullName;
}