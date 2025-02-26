import { Router } from 'express';
import {
  createApartmentHandler,
  getApartmentDetailsHandler,
  getApartmentsHandler,
} from '../controllers';

const router = Router();

router.route('/').post(createApartmentHandler).get(getApartmentsHandler);
router.route('/:id').get(getApartmentDetailsHandler);

export { router as apartmentRouter };
