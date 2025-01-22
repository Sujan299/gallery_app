const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("Connected to mongodb successfully !")
    }
).catch(
    ()=>{
        console.log("Can not connect to mongodb");
    }
)