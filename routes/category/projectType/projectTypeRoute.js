import Router from 'express'
import { createProjectType, getProjectTypeById , getProjectType} from '../../../controller/category/projectType/projectTypeApi.js'

const router = Router();

router.post('/projectType/', createProjectType);

router.get('/projectType/:id', getProjectTypeById);

router.get('/projectType/', getProjectType);

export default router;