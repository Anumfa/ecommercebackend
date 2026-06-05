import express from 'express';
import Cart from '../Models/cartschema.js';

const router = express.Router();

// Get cart for user
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) return res.status(200).json({ success: true, data: { items: [] } });
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add to cart
router.post('/add', async (req, res) => {
    try {
        const { userId, productId, quantity, selectedColor, selectedSize } = req.body;
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [{ product: productId, quantity, selectedColor, selectedSize }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity, selectedColor, selectedSize });
            }
            await cart.save();
        }
        
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.status(200).json({ success: true, data: populatedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove from cart
router.delete('/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
        }
        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
