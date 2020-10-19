import { create, getById, get } from './projectTypeController.js';
import { validateCreateRequest } from '../../../helper/validator.js';
import ProjectType from '../../../models/category/projectType.js';
import { failCreateResponse } from '../../../helper/response.js'

export const createProjectType = async (req, res) => {
    const [missingFields, wrongFields, success] = validateCreateRequest(ProjectType, req.body);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(req.body)
        res.status(result.status).json(result);
    }
}

export const getProjectTypeById = async (req, res) => {
    const result = await getById(req.params.id);
    return res.status(result.status).send(result);
}

export const getProjectType = (req, res) => {
    const options = req.params;
    const result = get(options);
    return res.status(200).send(result);
}