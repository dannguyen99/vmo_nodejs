import { create, getById, get, updateById, deleteById } from './ProjectStatusController.js';
import { validateCreateRequest, validateUpdateRequest } from '../../../helper/validator.js';
import ProjectStatus from '../../../models/category/projectStatus.js';
import { failCreateResponse, failUpdateResponse } from '../../../helper/response.js'

export const createProjectStatus = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(ProjectStatus, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        res.status(result.status).json(result);
    }
}

export const getProjectStatusById = async (req, res) => {
    const result = await getById(req.params.id);
    return res.status(result.status).json(result);
}

export const getProjectStatus = async (req, res) => {
    const options = req.query;
    let result = await get(options);
    return res.status(200).json(result);
}

export const updateProjectStatusById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(ProjectStatus, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        res.status(result.status).json(result);
    }
}

export const deleteProjectStatusById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    res.status(result.status).json(result)
}