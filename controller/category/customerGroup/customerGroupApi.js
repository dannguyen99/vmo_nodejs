import { create, getById, get, updateById, deleteById } from './customerGroupController.js';
import { validateCreateRequest, validateUpdateRequest } from '../../../helper/validator.js';
import CustomerGroup from '../../../models/category/customerGroup.js';
import { failCreateResponse, failUpdateResponse } from '../../../helper/response.js'

export const createCustomerGroup = async (req, res) => {
    const data = req.body;
    const [missingFields, wrongFields, success] = validateCreateRequest(CustomerGroup, data);
    if (!success) {
        const result = failCreateResponse(missingFields, wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await create(data)
        return res.status(result.status).json(result);
    }
}

export const getCustomerGroupById = async (req, res) => {
    const result = await getById(req.params.id);
    return res.status(result.status).json(result);
}

export const getCustomerGroup = async (req, res) => {
    const options = req.query;
    let result = await get(options);
    return res.status(200).json(result);
}

export const updateCustomerGroupById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const [wrongFields, success] = validateUpdateRequest(CustomerGroup, data);
    if (!success) {
        const result = failUpdateResponse(wrongFields);
        return res.status(result.status).json(result);
    }
    else {
        const result = await updateById(id, data);
        return res.status(result.status).json(result);
    }
}

export const deleteCustomerGroupById = async (req, res) => {
    const id = req.params.id;
    const result = await deleteById(id);
    return res.status(result.status).json(result)
}