import { Router } from 'express';
import { apartmentRouter } from './apartment.routes';

const router = Router();

router.use('/apartments', apartmentRouter);

export default router;
