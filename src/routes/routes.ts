import { Router } from 'express';
import { updateProduct } from '../controllers/products';
import { file } from '../middleware/multer';
import { verifyFileUpload } from '../middleware/verifyFileUpload';

const routes = Router();

routes.get('/', file.single('csv'), verifyFileUpload, updateProduct);

export default routes;
