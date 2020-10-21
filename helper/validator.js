import mongoose from 'mongoose';

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
            if (dataType == 'date') {
                if (typeof (dataField) !== 'string') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "string"
                    })
                }
                if ((new Date(dataField) == "Invalid Date") || isNaN(new Date(dataField))) {
                    console.log(dataField, true)
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "valid string date"
                    })
                }
            }
            else if (dataType == 'array') {
                if (typeof (dataField) !== 'object') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "array"
                    })
                }
                const arrDataType = fields[fieldName]['$embeddedSchemaType']['instance'].toLowerCase()
                if (arrDataType === 'objectid') {
                    if (!validateIdArray(dataField)) {
                        wrongFields.push({
                            fieldName: fieldName.concat(" element"),
                            dataType: arrDataType.concat(" and unique")
                        })
                    }
                }
                else {
                    if (!validateArray(dataField, arrDataType)) {
                        wrongFields.push({
                            fieldName: fieldName.concat(" element"),
                            dataType: arrDataType
                        })
                    }
                }
            }
            else {
                if (typeof (dataField) !== dataType) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: dataType
                    })
                }
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

export const validateIdArray = (arr) => {
    if ((new Set(arr)).size !== arr.length)
        return false;
    for (const id of arr) {
        if (!mongoose.Types.ObjectId.isValid(id) || typeof id !== 'string')
            return false;
    }
    return true;
}

export const validateArray = (arr, dataType) => {
    for (const element of arr) {
        if (typeof element !== dataType)
            return false;
    }
    return true;
}

export const validateIdInDatabase = async (model, arr) => {
    const result = await model.find({ _id: { $in: arr } })
    return result.length === arr.length;
}