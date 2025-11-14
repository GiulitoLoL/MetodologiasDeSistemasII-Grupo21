import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();
const productController = new ProductController();

router.get('/', productController.listProducts); 

router.get('/:id', productController.getProductById);

router.get('/type/:tipo', productController.getProductByType);

router.route('/')
    .get(productController.listProducts)     
    .post(productController.createProduct);  

router.route('/:id')
    .get(productController.getProduct)      
    .put(productController.updateProduct)   
    .delete(productController.deleteProduct);

export default router;