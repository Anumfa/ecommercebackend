import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the banner'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the banner'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL']
    }
}, {
    timestamps: true
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
