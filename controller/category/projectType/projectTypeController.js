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
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
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


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        const result = await ProjectType.paginate({}, { offset: offset, limit: limit, sort: sort });
        return response('GET project type success', 'GET_PROJECTTYPE_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getProjectTypeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        const projectType = await ProjectType.findById(id);
        if (!projectType)
            return response('No project type with given ID', 'PROJECTTYPE_NOT_EXIST', [], 400);
        data.updatedAt = Date.now()
        await projectType.updateOne(data);
        return response('Update project type success', 'UPDATE_PROJECTTYPE_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdProjectTypeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await ProjectType.findByIdAndDelete(id);
        if (!result)
            return response('No project type with given ID', 'PROJECTTYPE_NOT_EXIST', [], 400);
        else
            return response('Delete project type success', 'DELETE_PROJECTTYPE_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdProjectTypeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}