const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 8080
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./Models/db");
const ImageRoutes = require("./Routes/ImageRoutes")
app.get("/", (req, res)=>{
    res.send("I am gallery app");
});

app.use("/api/images", ImageRoutes)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})