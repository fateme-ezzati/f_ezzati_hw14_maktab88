const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
	writeFile: writeFileNormal
} = require('node:fs');
const path = require("path");
const users = require("../db/users-data.json");


//load page
router.get("/panel", (req, res) => {

    res.sendFile(path.join(__dirname, "../views/pages/admin-page.html"))

});

//get data
router.get("/get-all-users", (req,res)=>{
    return res.json(users);
})

router.get("/get-user/:username", (req,res)=>{

    console.log(req.params.username);

    const user = users.find(element => element.username == req.params.username);

    if (!user) {
        return res.status(404).send("Not Found!");
    };


    return res.json(user);
})


// remove product
router.delete("/remove-user/:username", (req, res) => {

    const usrsTemp = users.filter(item => item.username != req.params.username);
4
    writeFile(path.join(__dirname, "../db/users-data.json"),JSON.stringify(usrsTemp))

    // try {
    //     fs.writeFileSync(path.join(__dirname, "../db/products-data.json"), JSON.stringify(productsTemp));
    // } catch (err) {
    //     console.log(err);
    //     return res.status(400).send("Try again later!")
    // };


    // res.send("remove product");
});

const writeFile = (path, data) => {
	return new Promise((resolve, reject) => {
		writeFileNormal(path, data, err => {
			if (!!err) return reject(err).status(400);

			resolve(data);
		});
	});
};


module.exports = router;