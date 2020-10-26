import { logger } from '../../../helper/logger.js';
import { response } from '../../../helper/response.js';
import { validateIdInDatabase } from '../../../helper/validator.js';
import TechStack from '../../../models/category/techStack.js';
import Employee from '../../../models/management/employee.js';
import Project from '../../../models/management/project.js';
import ProjectType from '../../../models/category/projectType.js';
import ProjectStatus from '../../../models/category/projectStatus.js';
import Department from '../../../models/management/department.js'

export const getById = async (id, isPopulate) => {
    try {
        let project = await Project.findById(id)
        if (!project)
            return response('No project with given ID', 'PROJECT_NOT_EXIST', [], 400);
        else {
            if (isPopulate) {
                project = await Project.findById(id)
                    .populate('techStacks', ['name', 'description'])
                    .populate('employees', ['name', 'identityNumber'])
                    .populate('projectType', 'name')
                    .populate('projectStatus', 'name')
                    .populate('department', ['name', 'description'])
                    .exec()
            }
            return response('Get project success', 'GET_PROJECT_SUCCESS', project, 200);
        }
    } catch (error) {
        logger(`getByIdProjectController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const create = async (data) => {
    try {
        const exist = await Project.findOne({ name: data.name });
        if (exist)
            return response('Project already exist', 'CREATE_PROJECT_FAIL', [], 409);

        if (! await validateIdInDatabase(TechStack, data.techStacks))
            return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 404);
        if (! await validateIdInDatabase(Employee, data.employees))
            return response('Employee does not exist in database', "EMPLOYEE_NOT_EXIST", [], 404);
        if (! await validateIdInDatabase(ProjectType, [data.projectType]))
            return response('ProjectType does not exist in database', "PROJECTTYPE_NOT_EXIST", [], 404);
        if (! await validateIdInDatabase(ProjectStatus, [data.projectStatus]))
            return response('Project Status does not exist in database', "PROJECTSTATUS_NOT_EXIST", [], 404);
        if (! await validateIdInDatabase(Department, [data.department]))
            return response('Department does not exist in database', "DEPARTMENT_NOT_EXIST", [], 404);
        data.createdAt = Date.now()
        data.updatedAt = Date.now()
        const project = await Project.create(data);
        for (const employee_id of data.employees) {
            await Employee.findByIdAndUpdate(employee_id, { '$addToSet': { projects: project._id } });
        }
        await Department.findByIdAndUpdate(data.department, {
            $addToSet: {
                projects: project._id,
                employees: { $each: data.employees }
            }
        })
        return response('Create project success', 'CREATE_PROJECT_SUCCESS', project._id, 200);
    } catch (error) {
        logger(`createProjectController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}


export const get = async (options) => {
    try {
        const offset = options.offset || 0;
        const limit = options.limit || 10;
        const sort = options.sort || 'id';
        let query = {}
        if (options.projectStatus)
            query.projectStatus = options.projectStatus;
        if (options.projectType)
            query.projectType = options.projectType;
        if (options.techStack)
            query.techStacks = options.techStack;
        const result = await Project
            .paginate(query,
                { offset: offset, limit: limit, sort: sort });
        return response('GET project success', 'GET_PROJECT_SUCCESS', result.docs, 200);
    } catch (error) {
        logger(`getProjectController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const updateById = async (id, data) => {
    try {
        if (data.techStacks) {
            if (! await validateIdInDatabase(TechStack, data.techStacks))
                return response('Tech Stack does not exist in database', "TEXTSTACK_NOT_EXIST", [], 400);
        }
        if (data.employees) {
            if (! await validateIdInDatabase(Employee, data.employees))
                return response('Employee does not exist in database', "EMPLOYEE_NOT_EXIST", [], 400);
        }

        data.updatedAt = Date.now()
        const result = await Project.findByIdAndUpdate(id, data);
        if (!result)
            return response('No project with given ID', 'PROJECT_NOT_EXIST', [], 400);
        else
            return response('Update project success', 'UPDATE_PROJECT_SUCCESS', [], 200)
    } catch (error) {
        logger(`updateByIdProjectController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}

export const deleteById = async (id) => {
    try {
        const result = await Project.findByIdAndDelete(id);
        if (!result)
            return response('No project with given ID', 'PROJECT_NOT_EXIST', [], 400);
        else
            return response('Delete project success', 'DELETE_PROJECT_SUCCESS', [], 200)
    } catch (error) {
        logger(`deleteByIdProjectController ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
}