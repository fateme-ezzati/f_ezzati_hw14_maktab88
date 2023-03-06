const express = require("express");
const app = express();
const productRouter = require("./routes/product");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use("/product", productRouter);


app.get("*", (req, res) => {
    res.status(404).send("Not Found!");
});


app.listen(5000,()=>{console.log('server is running on 5000')});