import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';

const uploadsDir = path.join(process.cwd(), 'uploads', 'avatars');
fs.mkdirSync(uploadsDir, { recursive: true });

// Cloudinary configured via `config/cloudinary.js` when env vars are present


const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const usingCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
const storage = usingCloudinary ? multer.memoryStorage() : multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  }
});

const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });

export const handleAvatarUpload = async (req, res, next) => {
  try {
    if (!req.file) return next();

    if (usingCloudinary && req.file.buffer) {
      const streamifier = (await import('streamifier')).default;
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'balpro/avatars' }, (error, result) => {
        if (error) return next(error);
        req.uploaded = { url: result.secure_url, public_id: result.public_id };
        next();
      });
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      return;
    }

    if (req.file && req.file.filename) {
      req.uploaded = { url: `/uploads/avatars/${req.file.filename}` };
    }

    next();
  } catch (err) {
    next(err);
  }
};

  export const uploadAvatar = upload;
