// // require('dotenv').config({path: './env'})
// import dotenv from "dotenv"
// import connectDB from "./db/index.js"

// dotenv.config({
//     path: './.env'
// })
// connectDB()

import connectDB from "./db/index.js";
// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    // path: './.env'
});

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERRR :", error)
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`   Sever is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed ! ", err)
})