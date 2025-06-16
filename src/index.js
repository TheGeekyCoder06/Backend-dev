// require('dotenv').config({path: '../.env'});
// src/index.js
// src/index.js
import dotenv from "dotenv";
dotenv.config(); // ✅ This must be at the top and called immediately

import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  }) 
  .catch((err) => {
    console.error("Connection error:", err);
  });


/*
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}, `)
        app.on('error', (err) => {
            console.log("Error connecting to MongoDB:", err);
            throw err;
        })
        app.listen(process.env.PORT , ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("Error" , error)
        throw error;
    }
    }
)()*/
