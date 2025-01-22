
// multer for easy upload
const multer = require("multer");
// bridge between multer and cloudinary
const {CloudinaryStorage} = require("multer-storage-cloudinary");
// version 2 cloudinary 
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "galleries", // to put in galleries folder
        format: async (req, file) => "png",
        public_id: (req, file) => file.originalname.split(".") + "" // get original name and splitted with . and converted into string
    }
})

// multer helps to upload file now
const cloudinaryFileUploader = multer({storage});

const uploadMultiple = cloudinaryFileUploader.array("images", 10); // images is field name and 10 is on one shot we accept 10
module.exports = {uploadMultiple}