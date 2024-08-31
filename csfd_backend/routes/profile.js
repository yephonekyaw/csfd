import { Router } from 'express';
import { getProfileData } from '../controllers/profile/getProfileData.js';
import { updateProfileData } from '../controllers/profile/updateProfileData.js';
import multer from 'multer';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/heic',
  'image/heif',
];

const MAX_FILE_SIZE = 5_242_880;

const profileRouter = Router();

export const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: function (req, file, cb) {
    const pass = ALLOWED_MIME_TYPES.includes(file.mimetype)

    cb(null, pass);
    req.failed_upload = !pass;
  },
}).single('avatar');

profileRouter.get('/', getProfileData);
profileRouter.put('/', upload, updateProfileData);

export { profileRouter };
