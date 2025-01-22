const express = require("express");
const Router = express.Router();
const { uploadMultiple } = require("../Middlewares/ImageUploader");
const ImageModel = require("../Models/ImageModel")


Router.get("/", async(req, res)=>{
    
    try {
        const data = await ImageModel.find();
        res.status(200).json({
            message: "All images",
            data: data,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err: err,
            success: false
        })
    }
})
Router.get("/:id", async(req, res)=>{
    
    try {
        const {id} = req.params;
        const data = await ImageModel.findOne({_id : id});
        res.status(200).json({
            message: "Image details",
            data: data,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err: err,
            success: false
        })
    }
})


Router.post("/upload-images", uploadMultiple, async(req, res) => {
    console.log("Image uploaded to cloudinary successfully !");

    console.log("what actually got uplaoded ", req.files);

    try {
        const images = req.files.map((file) => (
            {
                mimeType: file.mimetype,
                originalName: file.originalname,
                size: file.size,
                imageURL: file.path
            }
        ));
        await ImageModel.insertMany(images);
        res.status(200).json({
            message: "File uploaded successfully !",
            data: req.files,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err: err,
            success: false
        })
    }
})

module.exports = Router;