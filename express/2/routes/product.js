const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const products = require("../db/products-data.json");

//load page
router.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../views/pages/productList.html"))

});


// read products
router.get("/getProducts", (req, res) => {

    return res.json(products);

});


router.get("/get-product/:productId", (req, res) => {

    console.log(req.params.productId);

    const product = products.find(element => element.id == req.params.productId);

    if (!product) {
        return res.status(404).send("Not Found!");
    };

    return res.json(product);

});


// create new product by post
router.post("/newProduct", (req, res) => {
    const newProduct = {
        id: Number(req.body.id),
        title: req.body.title,
        price: req.body.price,
        brand: req.body.brand,
        rating: req.body.rating,
        stock: req.body.stock,
        category: req.body.category,
    };

    products.push(newProduct);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(newProduct);
});

// create new product by patch
router.patch("/newProduct", (req, res) => {
    const newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        brand: req.body.brand,
        rating: req.body.rating,
        category: req.body.category,
    };

    products.push(newProduct);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(newProduct);
});

// update product
router.put("/update-product/:productId", (req, res) => {

    const product = products.find(x => x.id == req.params.productId);

    if (req.body.id) product.id = Number(req.body.id);
    if (req.body.title) product.title = req.body.title;
    if (req.body.price) product.price = req.body.price;
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.rating) product.rating = req.body.rating;
    if (req.body.stock) product.stock = req.body.stock;
    if (req.body.category) product.category = req.body.category;

    try {
        fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(products));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(product);
});


// remove product
router.delete("/remove-product/:productId", (req, res) => {

    const productsTemp = products.filter(item => item.id != req.params.productId);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(productsTemp));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };


    res.send("remove product");
});





module.exports = router;