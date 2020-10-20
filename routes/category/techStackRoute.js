import Router from 'express'
import { createTechStack, getTechStackById, getTechStack, updateTechStackById, deleteTechStackById } from '../../controller/category/techStack/techStackApi.js'

const router = Router();

router.post('/techStack/', createTechStack);

router.get('/techStack/:id', getTechStackById);

router.get('/techStack/', getTechStack);

router.put('/techStack/:id', updateTechStackById);

router.delete('/techStack/:id', deleteTechStackById);

export default router;