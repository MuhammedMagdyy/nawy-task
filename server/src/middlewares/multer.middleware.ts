import multer from 'multer';
import { ApiError, UNSUPPORTED_MEDIA_TYPE } from '../utils';

export const multerMiddlewareUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
      callback(null, true);
    } else {
      callback(
        new ApiError(
          'Only .png, .jpg and .jpeg format allowed!',
          UNSUPPORTED_MEDIA_TYPE
        )
      );
    }
  },
});
