const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    imageURL: {
        type: String
    },
    originalName: {
        type: String
    },
    mimeType:{
        type: String
    },
    size:{
        type: String
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const ImageModel = mongoose.model("gallaries", ImageSchema);

module.exports = ImageModel;