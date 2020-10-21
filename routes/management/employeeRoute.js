import Router from 'express'
import { createEmployee, getEmployeeById, getEmployee, updateEmployeeById, deleteEmployeeById } from '../../controller/management/employee/employeeApi.js'

const router = Router();

router.post('/employee/', createEmployee);

router.get('/employee/:id', getEmployeeById);

router.get('/employee/', getEmployee);

router.put('/employee/:id', updateEmployeeById);

router.delete('/employee/:id', deleteEmployeeById);

export default router;