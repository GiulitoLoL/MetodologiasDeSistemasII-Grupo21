import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { productService } from '../services/productService';

const router = Router();
const productController = new ProductController();

router.get('/', productController.listProducts); 

router.get('/type/:tipo', productController.getProductByType);

router.route('/')
    .get(productController.listProducts)     
    .post(productController.createProduct);  

router.route('/:id')
    .get(productController.getProductById)     
    .put(productController.updateProduct)   
    .delete(productController.deleteProduct);

router.get('/movements', (req, res) => {
    try {
        const movements = productService.getAllMovements();
        res.json(movements);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el registro de movimientos.' });
    }
});

export default router;