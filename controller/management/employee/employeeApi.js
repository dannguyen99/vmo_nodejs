import { create, getById, get, updateById, deleteById } from './EmployeeController.js';
import { validateCreateRequest, validateUpdateRequest } from '../../../helper/validator.js';
import Employee from '../../../models/management/employee.js';
import { failCreateResponse, failUpdateResponse } from '../../../helper/response.js'

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
    const result = await getById(req.params.id);
    return res.status(result.status).json(result);
}

export const getEmployee = async (req, res) => {
    const options = req.query;
    let result = await get(options);
    return res.status(200).json(result);
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