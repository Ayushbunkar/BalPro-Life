import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';

const uploadsDir = path.join(process.cwd(), 'uploads', 'products');

// Ensure uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true });

// Cloudinary is configured in `config/cloudinary.js` if env vars provided

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Choose storage based on Cloudinary availability
const usingCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
const storage = usingCloudinary ? multer.memoryStorage() : multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  }
});

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Middleware to handle uploaded file: store local path or upload to Cloudinary
export const handleUpload = async (req, res, next) => {
  try {
    if (!req.file) return next();

    // If cloudinary configured and file is in memory
    if (usingCloudinary && req.file.buffer) {
      const streamifier = (await import('streamifier')).default;
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'balpro/products' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return next(error);
        }
        req.uploaded = { url: result.secure_url, public_id: result.public_id };
        next();
      });
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      return;
    }

    // Otherwise file was stored on disk by multer.diskStorage
    if (req.file && req.file.filename) {
      req.uploaded = { url: `/uploads/products/${req.file.filename}` };
    }

    return next();
  } catch (err) {
    console.error('handleUpload error:', err);
    return next(err);
  }
};

export const uploadProduct = upload;
