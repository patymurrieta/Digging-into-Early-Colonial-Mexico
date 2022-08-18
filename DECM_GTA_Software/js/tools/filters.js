
function filterReferencesDuplicated(annotations){
    let uniqueIds = new Set();

    return annotations.filter(annotation => {
        const isDuplicate = uniqueIds.has(annotation.id);

        uniqueIds.add(annotation.id);

        if (!isDuplicate) {
            return true;
        }

        return false;
    });
}

function getToponymFieldsOfReferences(references)
{
    let toponyms = [];

    references.filter(reference => {
        const isDuplicate = toponyms.includes(reference.keyWords.toLowerCase());

        toponyms.push(reference.keyWords.toLowerCase());

        if (!isDuplicate) {
            return true;
        }

        return false;
    });

    return toponyms;
}


