import { Router } from 'express';
import { analyzeFile } from '../controllers/file';
import { updateProducts } from '../controllers/products';
import { file } from '../middleware/multer';
import { verifyFileUpload } from '../middleware/verifyFileUpload';
import { loginUser, registerUser } from '../controllers/users';

const routes = Router();

routes.post("/users", registerUser);
routes.post("/users/login", loginUser);

routes.use(file.single('csv'));
routes.use(verifyFileUpload);

routes.post('/file', analyzeFile);
routes.patch('/products', updateProducts);

export default routes;