import { create, getById, get, updateById, deleteById } from './DepartmentController.js';
import { validateCreateRequest, validateUpdateRequest } from '../../../helper/validator.js';
import Department from '../../../models/management/department.js';
import { failCreateResponse, failUpdateResponse } from '../../../helper/response.js'

export const createDepartment = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(Department, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        return res.status(result.status).json(result);
    }
}

export const getDepartmentById = async (req, res) => {
    const populate = req.query.populate || false;
    const result = await getById(req.params.id, populate);
    return res.status(result.status).json(result);
}

export const getDepartment = async (req, res) => {
    const options = req.query;
    let result = await get(options);
    return res.status(200).json(result);
}

export const updateDepartmentById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(Department, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        return res.status(result.status).json(result);
    }
}

export const deleteDepartmentById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    return res.status(result.status).json(result)
}