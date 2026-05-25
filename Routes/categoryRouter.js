import express from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../Controllers/categoryController.js';
import { upload } from '../Utils/uploadimage.js';

const router = express.Router();

router.post('/create', upload.any(), createCategory);
router.get('/all', getCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', upload.any(), updateCategory);
router.delete('/delete/:id', deleteCategory);

export default router;
