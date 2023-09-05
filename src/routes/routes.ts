import { Router } from 'express';
import { updateProduct } from '../controllers/products';
import { file } from '../multer/multer';

const routes = Router();

routes.get('/', file.single('csv'), updateProduct);

export default routes;
