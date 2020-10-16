const response = (message, messageCode, data, status) => {
    return {
        message: message,
        messageCode: messageCode,
        data: data,
        status: status
    }
}

export default response;