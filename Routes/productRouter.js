import express from 'express';
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from '../Controllers/productController.js';
import { upload } from '../Utils/uploadimage.js';

const router = express.Router();

router.post('/create', upload.any(), createProduct);
router.get('/all', getProducts);
router.get('/:id', getProductById);
router.put('/update/:id', upload.any(), updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
