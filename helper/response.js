export const response = (message, messageCode, data, status) => {
    const messageCodeWords = messageCode.split(" ");
    messageCode = messageCodeWords.join("_").toUpperCase();
    return {
        "message": message,
        "messageCode": messageCode,
        "data": data,
        "status": status
    };
}

export const failCreateResponse = (missingFields, wrongFields) => {
    if (missingFields.length !== 0) {
        const requiredField = missingFields[0];
        return response(`${requiredField} is required`, `${requiredField.toUpperCase()}_IS_REQUIRED`, [], 400);
    }
    else {
        const wrongField = wrongFields[0];
        const fieldName = wrongField.fieldName;
        const dataType = wrongField.dataType;
        return response(`${fieldName} is ${dataType}`, `${fieldName} must be a ${dataType}`, [], 400);
    }
}

export const failUpdateResponse = (wrongFields) => {
    if (wrongFields.length === 0) {
        return response('An update field is required', 'UPDATE_FIELD_IS_REQUIRED', [], 400);
    }
    else {
        const wrongField = wrongFields[0];
        const fieldName = wrongField.fieldName;
        const dataType = wrongField.dataType;
        return response(`${fieldName} is ${dataType}`, `${fieldName} must be a ${dataType}`, [], 400);
    }
}

