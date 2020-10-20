import Router from 'express'
import { createProjectType, getProjectTypeById, getProjectType, updateProjectTypeById, deleteProjectTypeById } from '../../controller/category/projectType/projectTypeApi.js'

const router = Router();

router.post('/projectType/', createProjectType);

router.get('/projectType/:id', getProjectTypeById);

router.get('/projectType/', getProjectType);

router.put('/projectType/:id', updateProjectTypeById);

router.delete('/projectType/:id', deleteProjectTypeById);

export default router;