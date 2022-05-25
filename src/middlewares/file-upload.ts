import multer from "multer";

export const FileUploadMiddleware = multer({
  storage: multer.memoryStorage(),
});
