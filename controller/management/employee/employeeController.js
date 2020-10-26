import Employee from '../../../models/management/employee.js';
import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';
import { validateIdInDatabase } from '../../../helper/validator.js';
import TechStack from '../../../models/category/techStack.js'
import Project from '../../../models/management/project.js'


export const getById = async (id, isPopulate) => {
    try {
        let employee = await Employee.findById(id)
        if (!employee)
            return response('No employee with given ID', 'EMPLOYEE_NOT_EXIST', [], 400);
        else {
            if (isPopulate) {
                employee = await Employee.findById(id)
                    .populate('techStacks', ['name', 'description'])
                    .populate('projects', ['name', 'description'])
                    .exec()
            }
            return response('Get employee success', 'GET_EMPLOYEE_SUCCESS', employee, 200);
        }
    } catch (error) {
        logger(`getByIdEmployeeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await Employee.findOne({ identityNumber: data.identityNumber });
        if (exist) {
            return response('Employee already exist', 'CREATE_EMPLOYEE_FAIL', [], 409);
        }
        if (! await validateIdInDatabase(TechStack, data.techStacks)) {
            return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 400);
        }
        if (! await validateIdInDatabase(Project, data.projects)) {
            return response('Project does not exist in database', "PROJECT_NOT_EXIST", [], 400);
        }
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const employee = await Employee.create(data);
        for (const project_id of data.projects) {
            await Project.findByIdAndUpdate(project_id, { '$addToSet': { employees: employee._id } });
        }
        return response('Create employee success', 'CREATE_EMPLOYEE_SUCCESS', employee._id, 200);
    } catch (error) {
        logger(`createEmployeeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        let query = {};
        if (options.techStack)
            query.techStacks = options.techStack;
        if (options.certificate)
            query.certificate = options.certificate;
        if (options.noProjects)
            query.projects = { $size: options.noProjects };
        const result = await Employee.paginate(query, { offset: offset, limit: limit, sort: sort });
        return response('GET employee success', 'GET_EMPLOYEE_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getEmployeeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        data.updatedAt = Date.now()
        if (data.techStacks) {
            if (! await validateIdInDatabase(TechStack, data.techStacks))
                return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 400);
        }
        if (data.projects) {
            if (! await validateIdInDatabase(Project, data.projects))
                return response('Project does not exist in database', "PROJECT_NOT_EXIST", [], 400);
        }
        const result = await Employee.findByIdAndUpdate(id, data);
        if (!result)
            return response('No employee with given ID', 'EMPLOYEE_NOT_EXIST', [], 400);
        else {
            for (const project_id of data.projects) {
                await Project.findByIdAndUpdate(project_id, { '$addToSet': { employees: id } });
            }
            return response('Update employee success', 'UPDATE_EMPLOYEE_SUCCESS', [], 200)
        }
    } catch (error) {
        logger(`updateByIdEmployeeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await Employee.findByIdAndDelete(id);
        if (!result)
            return response('No employee with given ID', 'EMPLOYEE_NOT_EXIST', [], 400);
        else
            return response('Delete employee success', 'DELETE_EMPLOYEE_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdEmployeeController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}