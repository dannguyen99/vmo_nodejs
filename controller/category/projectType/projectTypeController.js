import ProjectType from '../../../models/category/projectType.js';
import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';


export const getById = async (id) => {
    try {
        const projectType = await ProjectType.findById(id)
        if (!projectType)
            return response('No project type with given ID', 'PROJECTTYPE_NOT_EXIST', [], 400);

        else
            return response('Get project type success', 'GET_PROJECTTYPE_SUCCESS', projectType, 200);
    } catch (error) {
        logger(`getByIdProjectTypeController ${error}`)
    }
}


export const create = async (data) => {
    try {
        const exist = await ProjectType.findOne({ name: data.name });
        if (exist) {
            return response('Name already taken', 'CREATE_PROJECTTYPE_FAIL', [], 409);
        }
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const projectType = await ProjectType.create(data);

        return response('Create project type success', 'CREATE_PROJECTTYPE_SUCCESS', projectType._id, 200);
    } catch (error) {
        logger(`createProjectTypeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = (options) => {
    try {
        ProjectType.paginate({}, { offset: options.offset, limit: options.limit }, (err, result) => {
            if (err) {
                logger(`getProjectTypeController ${error}`)
                return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
            }
            return result;
        })
    } catch (error) {
        logger(`getProjectTypeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
} 