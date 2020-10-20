export const validateCreateRequest = (model, data) => {
    const fields = model.schema.paths
    const names = Object.keys(fields)
    let missingFields = new Array;
    let wrongFields = new Array;
    for (let index = 0; index < names.length - 4; index++) {
        const fieldName = names[index];
        if (!(fieldName in data)) {
            missingFields.push(fieldName);
        }
        else {
            const dataField = data[fieldName]
            const dataType = fields[fieldName]['instance'].toLowerCase()
            if (typeof (dataField) !== dataType) {
                wrongFields.push({
                    "fieldName": fieldName,
                    "dataType": dataType
                })
            }
        }
    }
    const success = missingFields.length === 0 && wrongFields.length === 0;
    return [missingFields, wrongFields, success];
}

export const validateUpdateRequest = (model, data) => {
    const fields = model.schema.paths
    const names = Object.keys(fields)
    let missingFields = new Array;
    let wrongFields = new Array;
    for (let index = 0; index < names.length - 4; index++) {
        const fieldName = names[index];
        if (!(fieldName in data)) {
            missingFields.push(fieldName);
        }
        else {
            const dataField = data[fieldName]
            const dataType = fields[fieldName]['instance'].toLowerCase()
            if (typeof (dataField) !== dataType) {
                wrongFields.push({
                    "fieldName": fieldName,
                    "dataType": dataType
                })
            }
        }
    }
    const success = missingFields.length !== names.length - 4 && wrongFields.length === 0;
    return [wrongFields, success];
}