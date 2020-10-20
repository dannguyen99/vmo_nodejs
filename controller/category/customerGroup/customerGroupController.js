import CustomerGroup from '../../../models/category/customerGroup.js';
import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';


export const getById = async (id) => {
    try {
        const customerGroup = await CustomerGroup.findById(id)
        if (!customerGroup)
            return response('No customer group with given ID', 'CUSTOMERGROUP_NOT_EXIST', [], 400);

        else
            return response('Get customer group success', 'GET_CUSTOMERGROUP_SUCCESS', customerGroup, 200);
    } catch (error) {
        logger(`getByIdCustomerGroupController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await CustomerGroup.findOne({ name: data.name });
        if (exist) {
            return response('Name already taken', 'CREATE_CUSTOMERGROUP_FAIL', [], 409);
        }
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const customerGroup = await CustomerGroup.create(data);

        return response('Create customer group success', 'CREATE_CUSTOMERGROUP_SUCCESS', customerGroup._id, 200);
    } catch (error) {
        logger(`createCustomerGroupController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        const result = await CustomerGroup.paginate({}, { offset: offset, limit: limit, sort: sort });
        return response('GET customer group success', 'GET_CUSTOMERGROUP_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getCustomerGroupController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        data.updatedAt = Date.now()
        const result = await CustomerGroup.findByIdAndUpdate(id, data);
        if (!result)
            return response('No customer group with given ID', 'CUSTOMERGROUP_NOT_EXIST', [], 400);
        else
            return response('Update customer group success', 'UPDATE_CUSTOMERGROUP_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdCustomerGroupController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await CustomerGroup.findByIdAndDelete(id);
        if (!result)
            return response('No customer group with given ID', 'CUSTOMERGROUP_NOT_EXIST', [], 400);
        else
            return response('Delete customer group success', 'DELETE_CUSTOMERGROUP_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdCustomerGroupController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}