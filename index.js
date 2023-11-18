const express = require('express');
const app=express();

//load config from env file
require("dotenv").config();
const PORT =process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//imports routes for Blog API
const blog=require("./routes/blog");

//mount the blog API routes
app.use("/api/v1",blog);

//start server
app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect=require("./config/database");
dbConnect();

//default route
app.get("/",(req,res)=>{
    res.send(`<h1> This is HOMEPAGE</h1>`);
})

