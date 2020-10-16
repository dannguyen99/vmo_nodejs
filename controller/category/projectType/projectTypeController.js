import { ProjectType } from '../../../models/category/projectType';
import { logger } from '../../../helper/logger.js';
import { response } from '.../.../.../helper/response.js';

export const createProjectType = async (data) => {
    try {
        const exist = await ProjectType.findOne({ name: data.name });
        if (exist) {
            return response('Name already taken', 'CREATE_PROJECT_TYPE_FAIL', [], 409);
        }
        const projectType = await ProjectType.create(data);

        return response('Create project type success', 'CREATE_PROJECT_TYPE_SUCCESS', projectType._id, 200);
    } catch (error) {
        logger(`createProjectType ${error}`)
        return response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500);
    }
} 