import Router from 'express'
import { createDepartment, getDepartmentById, getDepartment, updateDepartmentById, deleteDepartmentById } from '../../controller/management/department/departmentApi.js'

const router = Router();

router.post('/department/', createDepartment);

router.get('/department/:id', getDepartmentById);

router.get('/department/', getDepartment);

router.put('/department/:id', updateDepartmentById);

router.delete('/department/:id', deleteDepartmentById);

export default router;