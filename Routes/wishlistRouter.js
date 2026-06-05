import express from 'express';
import Wishlist from '../Models/wishlistschema.js';

const router = express.Router();

// Get wishlist for user
router.get('/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products');
        if (!wishlist) return res.status(200).json({ success: true, data: { products: [] } });
        res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Toggle wishlist item
router.post('/toggle', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let wishlist = await Wishlist.findOne({ user: userId });
        
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: userId, products: [productId] });
        } else {
            const index = wishlist.products.findIndex(id => id.toString() === productId);
            if (index > -1) {
                wishlist.products.splice(index, 1); // Remove if exists
            } else {
                wishlist.products.push(productId); // Add if not exists
            }
            await wishlist.save();
        }
        
        const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
        res.status(200).json({ success: true, data: populatedWishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
