import Router from 'express'
import { createProjectStatus, getProjectStatusById, getProjectStatus, updateProjectStatusById, deleteProjectStatusById } from '../../controller/category/projectStatus/projectStatusApi.js'

const router = Router();

router.post('/projectStatus/', createProjectStatus);

router.get('/projectStatus/:id', getProjectStatusById);

router.get('/projectStatus/', getProjectStatus);

router.put('/projectStatus/:id', updateProjectStatusById);

router.delete('/projectStatus/:id', deleteProjectStatusById);

export default router;