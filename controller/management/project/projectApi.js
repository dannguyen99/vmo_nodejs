import { create, getById, get, updateById, deleteById } from './ProjectController.js';
import { isValidId, validateCreateRequest, validateGetQuery, validateIdArray, validateUpdateRequest } from '../../../helper/validator.js';
import Project from '../../../models/management/project.js';
import { failCreateResponse, failUpdateResponse, response } from '../../../helper/response.js'

export const createProject = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(Project, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        return res.status(result.status).json(result);
    }
}

export const getProjectById = async (req, res) => {
    const populate = req.query.populate || false;
    const result = await getById(req.params.id, populate);
    return res.status(result.status).json(result);
}

export const getProject = async (req, res) => {
    const options = req.query;
    const [wrongFields, success] = validateGetQuery(options);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        if (options.projectStatus) {
            if (!isValidId(options.projectStatus))
                return res.status(400).send(response("project status must be a valid ID", "PROJECTSTATUS_IS_ID", [], 400));
        }
        if (options.projectType) {
            if (!isValidId(options.projectType))
                return res.status(400).send(response("project type must be a valid ID", "PROJECTTYPE_IS_ID", [], 400));
        }
        if (options.techStack) {
            if (!isValidId(options.techStack))
                return res.status(400).send(response("tech stack  must be a valid ID", "TECHSTACKS_IS_ID", [], 400));
        }
        let result = await get(options);
        return res.status(200).json(result);
    }

}

export const updateProjectById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(Project, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        return res.status(result.status).json(result);
    }
}

export const deleteProjectById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    return res.status(result.status).json(result)
}