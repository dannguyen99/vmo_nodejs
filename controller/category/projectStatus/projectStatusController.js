import ProjectStatus from '../../../models/category/projectStatus.js';
import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';


export const getById = async (id) => {
    try {
        const projectStatus = await ProjectStatus.findById(id)
        if (!projectStatus)
            return response('No project status with given ID', 'PROJECTSTATUS_NOT_EXIST', [], 400);

        else
            return response('Get project status success', 'GET_PROJECTSTATUS_SUCCESS', projectStatus, 200);
    } catch (error) {
        logger(`getByIdProjectStatusController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await ProjectStatus.findOne({ name: data.name });
        if (exist) {
            return response('Name already taken', 'CREATE_PROJECTSTATUS_FAIL', [], 409);
        }
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const projectStatus = await ProjectStatus.create(data);

        return response('Create project status success', 'CREATE_PROJECTSTATUS_SUCCESS', projectStatus._id, 200);
    } catch (error) {
        logger(`createProjectStatusController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        const result = await ProjectStatus.paginate({}, { offset: offset, limit: limit, sort: sort });
        return response('GET project status success', 'GET_PROJECTSTATUS_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getProjectStatusController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        data.updatedAt = Date.now()
        const result = await ProjectStatus.findByIdAndUpdate(id, data);
        if (!result)
            return response('No project status with given ID', 'PROJECTSTATUS_NOT_EXIST', [], 400);
        else
            return response('Update project status success', 'UPDATE_PROJECTSTATUS_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdProjectStatusController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await ProjectStatus.findByIdAndDelete(id);
        if (!result)
            return response('No project status with given ID', 'PROJECTSTATUS_NOT_EXIST', [], 400);
        else
            return response('Delete project status success', 'DELETE_PROJECTSTATUS_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdProjectStatusController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}