import { Router } from 'express';
import {
  createApartmentHandler,
  getApartmentDetailsHandler,
  getApartmentsHandler,
} from '../controllers';
import { isAuth, multerMiddlewareUpload } from '../middlewares';

const router = Router();

router
  .route('/')
  .post(isAuth, multerMiddlewareUpload.single('image'), createApartmentHandler)
  .get(getApartmentsHandler);
router.route('/:id').get(getApartmentDetailsHandler);

export { router as apartmentRouter };
