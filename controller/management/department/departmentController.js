import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';
import { validateIdInDatabase } from '../../../helper/validator.js';
import TechStack from '../../../models/category/techStack.js'
import Department from '../../../models/management/department.js'
import Employee from '../../../models/management/employee.js';
import Project from '../../../models/management/project.js';


export const getById = async (id, isPopulate) => {
    try {
        let department = await Department.findById(id)
        if (!department)
            return response('No department with given ID', 'DEPARTMENT_NOT_EXIST', [], 400);
        else {
            if (isPopulate) {
                department = await Department.findById(id)
                    .populate('techStacks', ['name', 'description'])
                    .populate('projects', ['name', 'description'])
                    .populate('employees', ['name', 'identityNumber'])
                    .exec()
            }
            return response('Get department success', 'GET_DEPARTMENT_SUCCESS', department, 200);
        }
    } catch (error) {
        logger(`getByIdDepartmentController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await Department.findOne({ name: data.name });
        if (exist)
            return response('Department already exist', 'CREATE_DEPARTMENT_FAIL', [], 409);
        if (! await validateIdInDatabase(TechStack, data.techStacks))
            return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 400);
        if (! await validateIdInDatabase(Project, data.projects))
            return response('Department does not exist in database', "DEPARTMENT_NOT_EXIST", [], 400);
        if (! await validateIdInDatabase(Employee, data.employees))
            return response('Employee does not exist in database', "EMPLOYEE_NOT_EXIST", [], 400);
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const department = await Department.create(data);

        return response('Create department success', 'CREATE_DEPARTMENT_SUCCESS', department._id, 200);
    } catch (error) {
        logger(`createDepartmentController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        const result = await Department.paginate({}, { offset: offset, limit: limit, sort: sort });
        return response('GET department success', 'GET_DEPARTMENT_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getDepartmentController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        if (data.techStacks) {
            if (! await validateIdInDatabase(TechStack, data.techStacks))
                return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 400);
        }
        if (data.projects) {
            if (! await validateIdInDatabase(Project, data.projects))
                return response('Department does not exist in database', "DEPARTMENT_NOT_EXIST", [], 400);
        }
        if (data.employees) {
            if (! await validateIdInDatabase(Employee, data.employees))
                return response('Employee does not exist in database', "EMPLOYEE_NOT_EXIST", [], 400);
        }
        data.updatedAt = Date.now()
        const result = await Department.findByIdAndUpdate(id, data);
        if (!result)
            return response('No department with given ID', 'DEPARTMENT_NOT_EXIST', [], 400);
        else
            return response('Update department success', 'UPDATE_DEPARTMENT_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdDepartmentController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await Department.findByIdAndDelete(id);
        if (!result)
            return response('No department with given ID', 'DEPARTMENT_NOT_EXIST', [], 400);
        else
            return response('Delete department success', 'DELETE_DEPARTMENT_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdDepartmentController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}