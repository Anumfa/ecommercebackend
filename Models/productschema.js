import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        default: 0
    },
    size: [{
        type: String
    }],
    color: [{
        type: String
    }],
    ptype: {
        type: String,
        required: [true, 'Product type is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    discountprice: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1;
            },
            message: 'At least 1 image is required'
        },
        required: [true, 'Product images are required']
    },
    catid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category ID is required']
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
