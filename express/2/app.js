const express = require("express");
const app = express();
const productRouter = require("./routes/product");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// app.set("view engine", "html");
app.use("/products-page", productRouter);

// read products
// app.get("/products-page", (req, res) => {
//     res.sendFile(path.join(__dirname, "./views/pages/productList.html"))
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"))
});

app.get("*", (req, res) => {
    res.status(404).send("Not Found!");
});

app.listen(5000,()=>{console.log('server is running on 5000')});