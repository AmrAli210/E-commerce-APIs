const express = require('express');
const app = express();
const productsData=require('./product.json')
const commentsData=require('./comments.json')
const mybagData=require('./mybag.json')
let port = process.env.PORT || 5000

app.get("/products",(req,res)=>{
    res.send(productsData)
})

app.get("/comments",(req,res)=>{
    res.send(commentsData)
})
app.get("/mybag",(req,res)=>{
    res.send(mybagData)
})

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}/products`);
    console.log(`Register Api on   http://localhost:${port}/comments`);
    console.log(`Login Api on   http://localhost:${port}/mybag`);
  });