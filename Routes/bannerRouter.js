import express from 'express';
import { 
    createBanner, 
    getBanners, 
    getBannerById, 
    updateBanner, 
    deleteBanner 
} from '../Controllers/bannerController.js';
import { upload } from '../Utils/uploadimage.js';

const router = express.Router();

router.post('/create', upload.any(), createBanner);
router.get('/all', getBanners);
router.get('/:id', getBannerById);
router.put('/update/:id', upload.any(), updateBanner);
router.delete('/delete/:id', deleteBanner);

export default router;
