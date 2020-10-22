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
            const dataField = data[fieldName];
            const dataType = fields[fieldName]['instance'].toLowerCase();
            if (dataType == 'date') {
                if (typeof (dataField) !== 'string') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "string"
                    })
                    continue;
                }
                if ((new Date(dataField) == "Invalid Date") || isNaN(new Date(dataField))) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "valid date string"
                    })
                }
            }
            else if (dataType == 'array') {
                if (typeof (dataField) !== 'object' || !isIterable(dataField)) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "array"
                    })
                    continue;
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
            else if (dataType === 'objectid') {
                if (!mongoose.Types.ObjectId.isValid(dataField) || typeof dataField !== 'string') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: dataType
                    })
                }
            }
            else {
                if (typeof (dataField) !== dataType) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: dataType
                    })
                }
                if (dataType === 'string') {
                    if (!isValidString(dataField)) {
                        wrongFields.push({
                            fieldName: fieldName,
                            dataType: "not empty string"
                        });
                    }
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
            if (dataType == 'date') {
                if (typeof (dataField) !== 'string') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "string"
                    })
                    continue;
                }
                if ((new Date(dataField) == "Invalid Date") || isNaN(new Date(dataField))) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "valid date string"
                    })
                }
            }
            else if (dataType === 'array') {
                if (typeof (dataField) !== 'object' || !isIterable(dataField)) {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: "array"
                    })
                    continue;
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
            else if (dataType === 'objectid') {
                if (!mongoose.Types.ObjectId.isValid(dataField) || typeof dataField !== 'string') {
                    wrongFields.push({
                        fieldName: fieldName,
                        dataType: dataType
                    })
                }
            }
            else {
                if (typeof (dataField) !== dataType) {
                    wrongFields.push({
                        "fieldName": fieldName,
                        "dataType": dataType
                    })
                }
                if (dataType === 'string') {
                    if (!isValidString(dataField)) {
                        wrongFields.push({
                            fieldName: fieldName,
                            dataType: "not empty string"
                        });
                    }
                }
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

const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const validateGetQuery = (options) => {
    let wrongFields = new Array;
    if (options.offset) {
        const offset = options.offset;
        if (!isNumeric(offset)) {
            wrongFields.push({
                "fieldName": 'offset',
                "dataType": 'positive number'
            });
        }
    }
    if (options.limit) {
        const limit = options.limit;
        if (!isNumeric(limit)) {
            wrongFields.push({
                "fieldName": 'limit',
                "dataType": 'positive number'
            });
        }
    }
    if (options.sort) {
        const sort = options.sort;
        if (typeof sort !== 'string') {
            wrongFields.push({
                "fieldName": 'sort',
                dataType: 'string'
            })
        }
    }
    const success = wrongFields.length === 0;
    return [wrongFields, success];
}

export const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id) && typeof id === 'string' || !isNaN(id);
}

const isValidString = (str) => {
    return !isNaN(str) && str.length !== 0;
}