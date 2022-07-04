let inputFiles = [];
let relationsList =[];
let bndAnnotationslLegend = false;
let bndRelations = false;

function newInputFile(e) {
    console.log(e.files);
    addFilesForProcessing(e.files);
}

function removeInputFile(key) {


    let inputFilesTmp = [];
    for (let i = 0; i < inputFiles.length; i++) {
        let relationName = splitRelationName(inputFiles[i]["name"]);

        if(relationName === "annotations-legend")
            bndAnnotationslLegend = false;
        if (relationName !== key) {

            inputFilesTmp.push(inputFiles[i]);
        }
    }
    inputFiles = inputFilesTmp;
    refreshLoadedFiles();
    console.log(inputFiles);
}

function addFilesForProcessing(files) {
    let repeatedFiles = [];
    let numberOfFilesToLoad = files.length
    for (let i = 0; i < numberOfFilesToLoad; i++) {
        let file = files[i];
        if (inputFiles.length > 0) {
            let numberOfLoadedFiles = inputFiles.length;
            let coincidence = false;
            for (let j = 0; j < numberOfLoadedFiles; j++) {
                let storedFile = inputFiles[j];
                if (file["name"] === storedFile["name"]) {
                    coincidence = true;
                    repeatedFiles.push(file["name"]);
                    break;
                }
            }
            if (!coincidence) inputFiles.push(file);
        } else inputFiles.push(file);
    }
    refreshLoadedFiles();
    if (repeatedFiles.length > 0) {
        alert("The following files were not added because their name is already loaded:\n\n" + repeatedFiles.join(", "));
    }

    console.log(inputFiles);
}

function seeFileType(currentRelation,extFile){
    if(extFile === "json")
        currentRelation.bndJson = true;
    else if (extFile === "html")
        currentRelation.bndCorpus = true;
}

function splitRelationName(fileName){

    let relationName="";

    if(fileName.includes(".txt.ann.json"))
        relationName = fileName.substring(0,fileName.length-13);
    else if(fileName.includes(".ann.json"))
        relationName = fileName.substring(0,fileName.length-9);
    else if(fileName.includes(".json"))
        relationName = fileName.substring(0,fileName.length-5);

    if(fileName.includes(".txt.plain.html"))
        relationName = fileName.substring(0,fileName.length-15);
    else if(fileName.includes(".plain.html"))
        relationName = fileName.substring(0,fileName.length-11);
    else if(fileName.includes(".html"))
        relationName = fileName.substring(0,fileName.length-5);


    return relationName;
}

function refreshLoadedFiles() {
    $("#loaded-files-list").empty();
    let html = "";

    relationsList = [];

    for (let i = 0; i < inputFiles.length; i++) {
        let file = inputFiles[i];
        let fileName = file["name"];



        let relationName = splitRelationName(fileName);

        if(relationName !== "annotations-legend") {
            let relationObject = {
                relation: relationName,
                bndJson: false,
                bndCorpus: false
            };

            let extFile = fileName.substring(file["name"].lastIndexOf(".") + 1);
            seeFileType(relationObject, extFile);
            if (relationsList.length === 0) {
                relationsList.push(relationObject);
            } else if (relationsList.find(relation => relation.relation === relationName) !== undefined) {

                relationsList.filter(function (relationItem) {

                    if (relationItem.relation === relationName) {
                        if (extFile === "json")
                            relationItem.bndJson = true;

                        if (extFile === "html")
                            relationItem.bndCorpus = true;
                    }

                    return true;
                });

            } else {
                relationsList.push(relationObject);
            }
        }else
        {
            bndAnnotationslLegend = true;
        }


    }

    $("#lbl-relations-counter").text(relationsList.length + " Loaded");
    bndRelations = true;
    relationsList.forEach(function (relationItem){

        let colorFileCorpusStatus= "";
        let colorFileAnnotationStatus= "";
        if(relationItem.bndCorpus)
            colorFileCorpusStatus = "success-file";
        else {
            colorFileCorpusStatus = "failed-file";
            bndRelations = false;
        }

        if(relationItem.bndJson)
            colorFileAnnotationStatus = "success-file";
        else {
            colorFileAnnotationStatus = "failed-file";
            bndRelations = false;
        }

        html +=`<div class="row mb-2 p-1">\n` +
            `                <div class="col-sm-9"><p class="relation-item text-left wrapper">`+shortNameTagTogFile(relationItem.relation)+`</p></div>\n` +
            `                <div class="col-sm-1 wrapper d-flex align-content-center align-items-center justify-content-center"><p class="relation-item-code wrapper `+colorFileAnnotationStatus+`">json</p></div>\n` +
            `                  <div class="col-sm-1 wrapper d-flex align-content-center align-items-center justify-content-center"><p class="relation-item-code wrapper `+colorFileCorpusStatus+`">html</p></div>\n` +
            `                  <div class="col-sm-1 wrapper d-flex align-content-center align-items-center justify-content-center"><i onclick="removeInputFile('` + relationItem.relation + `')" style="color: #00acc1;" class="fas fa-times"></i></div>\n` +
            `              </div>`;
    });
    $("#loaded-files-list").append(html);

    if(bndRelations && bndAnnotationslLegend)
        $("#corpus-loader-trigger").show();
    else
        $("#corpus-loader-trigger").hide();

    if(bndAnnotationslLegend) {
        $("#btn-delete-legend-file").show();
        $("#lbl-legend-file-status").text("Loaded").removeClass("failed-file").addClass("success-file");
    }
    else {
        $("#btn-delete-legend-file").hide();
        $("#lbl-legend-file-status").text("Empty").removeClass("success-file").addClass("failed-file");
    }
}

function allowFilesDragging(mask) {
    $(mask).addClass("active");
}

function dragOut(input) {
    $(input).parent().find(".dad-mask").removeClass("active");
}

function disableFilesDragging(input) {
    $(input).parent().find(".dad-mask").removeClass("active");
}