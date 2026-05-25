import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the category'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL']
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
