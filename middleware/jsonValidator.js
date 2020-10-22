import { response } from "../helper/response.js";

const jsonValidator = (error, req, res, next) => {
    return res.status(400).send(response('Invalid JSON body', "INVALID_JSON_BODY", [], 400));
};

export default jsonValidator;