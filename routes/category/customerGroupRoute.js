import Router from 'express'
import { createCustomerGroup, getCustomerGroupById, getCustomerGroup, updateCustomerGroupById, deleteCustomerGroupById } from '../../controller/category/customerGroup/customerGroupApi.js'

const router = Router();

router.post('/customerGroup/', createCustomerGroup);

router.get('/customerGroup/:id', getCustomerGroupById);

router.get('/customerGroup/', getCustomerGroup);

router.put('/customerGroup/:id', updateCustomerGroupById);

router.delete('/customerGroup/:id', deleteCustomerGroupById);

export default router;