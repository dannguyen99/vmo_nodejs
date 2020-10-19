export const response = (message, messageCode, data, status) => {
    return {
        "message": message,
        "messageCode": messageCode,
        "data": data,
        "status": status
    }
}

export const failCreateResponse = (missingFields, wrongFields) => {
    if (missingFields.length !== 0) {
        const requiredField = missingFields[0];
        return response(`${requiredField} is required`, `${requiredField}_IS_REQUIRED`, [], 400);
    }
    else {
        const wrongField = wrongFields[0];
        console.log(wrongFields)
        const fieldName = wrongField.fieldName;
        const dataType = wrongField.dataType;
        return response(`${fieldName.toUpperCase()}_IS_${dataType.toUpperCase()}`, `${fieldName} must be a ${dataType}`, [], 400);
    }
}

