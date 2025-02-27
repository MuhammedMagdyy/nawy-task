import { Router } from 'express';
import { processUserLogin, processUserRegistration } from '../controllers';

const router = Router();

router.post('/register', processUserRegistration);
router.post('/login', processUserLogin);

export { router as authRouter };
