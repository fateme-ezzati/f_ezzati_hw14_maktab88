const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"))
});

app.get("*", (req, res) => {
    res.status(404).send("Not Found!");
});

app.listen(5000,()=>{console.log('server is running on 5000')});