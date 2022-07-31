const express = require("express")
const app = express()
const port= 8080;


app.get('/', (req, res)=>{
    res.send("<!DOCTYPE html><html><body><h1>Hello world!</h1></body></html>")
    });


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
});