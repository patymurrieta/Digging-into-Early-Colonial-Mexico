class DataBaseGTAController{

    constructor() {
        let central = [];//tabla con información central de cada una de las etiquetas
        let entities = [];//tabla de las entidades principales
        let subEntities = [];
        let gazetteer = [];
        let documents =[];
        let queries = [];//tabla de queries a procesar
    }

    addAnnotation(keyRelation, keyWords, index, entity, paragraph, color){
        this.central.push({
            key: keyRelation,
            index: index,
            label: keyWords,
            wordsCount: keyWords.split(" ").length,
            classId: entity,
            paragraph: paragraph,
            color: color
        });
    }



    getAllAnnotations() {
        return this.central;
    }

    getCoincidencesByCoords(keywords) {
        return this.central.filter(function (annotation) {
            var bnd = false;
            keywords.forEach(function (keywordMap) {
                if(annotation.label.toLowerCase() === keywordMap.toLowerCase())
                    bnd= true;
            });

            return bnd;
        });
    }


    ///antes runQuery para filtrar con los checkbox de los filtros rapidos
     getCoincidencesByFilterEntity(entitiesRules){ ///antes runQuery
        return this.central.filter(function (annotation) {
            var result = false;
            entitiesRules.forEach(function (entityRule) {
                if (annotation.classId.value.toLowerCase() === entityRule.keyEntity.toLowerCase()) {
                    result = true;
                }
            });
            return result;
        });
    }


    //para mostrar en contructor de queries al momento de seleccionar una label
    getUniqueAnnotations(entityCode,label){
        var index = []; //lista de anotaciones sin repetición
        var all =[]; //lista con las anotaciones filtradas pero con repeticiones
        all = this.central.filter(function (annotation) {
            var bnd = false;
            if(annotation.classId.value === entityCode){
                if(label !== "" && label !== null)
                {
                    annotation.classId.labels.forEach(function (labelAnnotation) {
                        if(labelAnnotation === label)
                            bnd = true;
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
    }

    //para mostrar en contructor de queries al momento de seleccionar una entidad que no tiene labels
     getUniqueAnnotationsOfEntity(entityCode) {

        var index = [];
        var all =[];
        all = this.central.filter(function (annotation) {
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



    ///////////////////////////Operaciones con el gazetteer//////////////////

    addGazetteerPlace(keywords, lat, lng,relation, alt, marker, types) {
        this.gazetteer.push({
            keyWords: keywords,
            latitude: lat,
            longitude: lng,
            altitude: alt,
            activate: true,
            marker: marker,
            types: types,
            relations: relation
        });
    }


    clearGazetteer() {
        this.gazetteer = [];
    }

    getAllPlacesGazetteer() {
        return this.gazetteer;
    }

     getMarkersByRelation(key) {
        return  this.gazetteer.filter((annotation) => annotation["relations"] === key);
    }

    getPlacesByLabel(name){
        return this.central.filter((annotation) => annotation["label"].toLowerCase() === name.toLowerCase());
    }


}