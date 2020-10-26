import { create, getById, get, updateById, deleteById } from './EmployeeController.js';
import { isValidString, validateCreateRequest, validateUpdateRequest, isNumeric, validateGetQuery } from '../../../helper/validator.js';
import Employee from '../../../models/management/employee.js';
import { failCreateResponse, failUpdateResponse, response } from '../../../helper/response.js'

export const createEmployee = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(Employee, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        return res.status(result.status).json(result);
    }
}

export const getEmployeeById = async (req, res) => {
    const populate = req.query.populate || false;
    const result = await getById(req.params.id, populate);
    return res.status(result.status).json(result);
}

export const getEmployee = async (req, res) => {
    const options = req.query;
    const [wrongFields, success] = validateGetQuery(options);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        if (options.certificate) {
            if (!isValidString(options.certificate))
                return res.status(400).send(response("certificate status must be a valid string", "CERTIFICATE_IS_STRING", [], 400));
        }
        if (options.techStack) {
            if (!isValidId(options.techStack))
                return res.status(400).send(response("tech stack  must be a valid ID", "TECHSTACKS_IS_ID", [], 400));
        }
        if (options.noProjects) {
            if (!isNumeric(options.noProjects))
                return res.status(400).send(response("noProject must be a valid number", "NOPROJECT_I_NUMBER", [], 400));
        }
        let result = await get(options);
        return res.status(200).json(result);
    }
}

export const updateEmployeeById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(Employee, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        return res.status(result.status).json(result);
    }
}

export const deleteEmployeeById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    return res.status(result.status).json(result)
}