const { mongoose } = require("mongoose");


const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true }, // Name of the uploaded image file
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who uploaded the image
    createdAt: { type: Date, default: Date.now } // Timestamp of when the image was uploaded
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;