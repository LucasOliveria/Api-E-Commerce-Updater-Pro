import { Router } from 'express';
import { analyzeFile } from '../controllers/file';
import { file } from '../middleware/multer';
import { verifyFileUpload } from '../middleware/verifyFileUpload';

const routes = Router();

routes.post('/file', file.single('csv'), verifyFileUpload, analyzeFile);

export default routes;