import express from 'express';
const router = express.Router();
import { create, deleteRenewable, getAll, getRenewableById, updateRenewable, getRenewableByOrganizationId, getRenewableByBuildingId, updateRenewableBuildingsById } from '../controller/controller';

router.get('/:id', getRenewableById)
router.get('/organization/:id', getRenewableByOrganizationId)
router.get('/all/renewable', getAll)
router.get('/building/:id', getRenewableByBuildingId)
router.put('/:id', updateRenewable)
router.put('/buildings/:id', updateRenewableBuildingsById)
router.post('/renewable', create)
router.delete('/:id', deleteRenewable)

export default router;