// server/utils/file-upload.ts
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

// Base directory for uploads
const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const fileExt = path.extname(file.originalname);
    cb(null, `${uniqueId}${fileExt}`);
  }
});

// File filter to only allow image files
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create the multer instance
export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * Get the absolute path for a relative file path
 * @param relativePath Relative path from the upload directory
 * @returns Absolute file path
 */
export function getAbsoluteFilePath(relativePath: string): string {
  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  return path.join(process.cwd(), 'data', cleanPath);
}

/**
 * Delete a file from the uploads directory
 * @param relativePath Relative path from the upload directory
 * @returns Promise that resolves when the file is deleted
 */
export async function deleteFile(relativePath: string): Promise<void> {
  if (!relativePath) return;
  
  const filePath = getAbsoluteFilePath(relativePath);
  
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        // If the file doesn't exist, we consider it already deleted
        if (err.code === 'ENOENT') {
          return resolve();
        }
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Middleware to handle file upload errors
 */
export function handleUploadErrors(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Le fichier est trop volumineux. Limite: 5MB' });
    }
    return res.status(400).json({ message: `Erreur d'upload: ${err.message}` });
  } else if (err) {
    // An unknown error occurred
    return res.status(500).json({ message: err.message || 'Une erreur est survenue lors de l\'upload' });
  }
  next();
}
