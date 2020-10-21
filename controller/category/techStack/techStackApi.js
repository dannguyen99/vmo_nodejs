import { create, getById, get, updateById, deleteById } from './TechStackController.js';
import { validateCreateRequest, validateUpdateRequest } from '../../../helper/validator.js';
import TechStack from '../../../models/category/techStack.js';
import { failCreateResponse, failUpdateResponse } from '../../../helper/response.js'

export const createTechStack = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(TechStack, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        return res.status(result.status).json(result);
    }
}

export const getTechStackById = async (req, res) => {
    const result = await getById(req.params.id);
    return res.status(result.status).json(result);
}

export const getTechStack = async (req, res) => {
    const options = req.query;
    let result = await get(options);
    return res.status(200).json(result);
}

export const updateTechStackById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(TechStack, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        return res.status(result.status).json(result);
    }
}

export const deleteTechStackById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    return res.status(result.status).json(result)
}