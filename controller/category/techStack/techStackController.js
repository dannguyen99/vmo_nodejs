import TechStack from '../../../models/category/techStack.js';
import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';


export const getById = async (id) => {
    try {
        const techStack = await TechStack.findById(id)
        if (!techStack)
            return response('No tech stack with given ID', 'TECHSTACK_NOT_EXIST', [], 400);

        else
            return response('Get tech stack success', 'GET_TECHSTACK_SUCCESS', techStack, 200);
    } catch (error) {
        logger(`getByIdTechStackController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await TechStack.findOne({ name: data.name });
        if (exist) {
            return response('Name already taken', 'CREATE_TECHSTACK_FAIL', [], 409);
        }
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const techStack = await TechStack.create(data);

        return response('Create tech stack success', 'CREATE_TECHSTACK_SUCCESS', techStack._id, 200);
    } catch (error) {
        logger(`createTechStackController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        const result = await TechStack.paginate({}, { offset: offset, limit: limit, sort: sort });
        return response('GET tech stack success', 'GET_TECHSTACK_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getTechStackController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        data.updatedAt = Date.now()
        const result = await TechStack.findByIdAndUpdate(id, data);
        if (!result)
            return response('No tech stack with given ID', 'TECHSTACK_NOT_EXIST', [], 400);
        else
            return response('Update tech stack success', 'UPDATE_TECHSTACK_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdTechStackController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await TechStack.findByIdAndDelete(id);
        if (!result)
            return response('No tech stack with given ID', 'TECHSTACK_NOT_EXIST', [], 400);
        else
            return response('Delete tech stack success', 'DELETE_TECHSTACK_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdTechStackController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}