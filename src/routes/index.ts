import { Router } from 'express';
import { apartmentRouter } from './apartment.routes';
import { authRouter } from './auth.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/apartments', apartmentRouter);

export default router;
