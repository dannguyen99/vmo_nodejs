import Router from 'express'
import { createProject, getProjectById, getProject, updateProjectById, deleteProjectById } from '../../controller/management/project/projectApi.js'

const router = Router();

router.post('/project/', createProject);

router.get('/project/:id', getProjectById);

router.get('/project/', getProject);

router.put('/project/:id', updateProjectById);

router.delete('/project/:id', deleteProjectById);

export default router;