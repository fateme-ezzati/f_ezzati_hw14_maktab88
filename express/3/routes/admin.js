const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
	writeFile
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
router.delete("/remove-user/:username", async(req, res) => {
    

    // try {

	// 	const user = users.find(user => user.username === req.params.username);
	// 	if (!user) throw new Error(`user: ${req.params.username} not Found!`);

    //     const usrsTemp = users.filter(item => item.username != req.params.username);


	// 	await writeFile('./users-data.json', JSON.stringify(usrsTemp));
	// } catch (error) {
	// 	console.log(error?.message);
	// }

    const usrsTemp = users.filter(item => item.username != req.params.username);
    try {
        fs.writeFileSync(path.join(__dirname, "../db/users-data.json"), JSON.stringify(usrsTemp));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };


    res.send("remove user");
    
});



module.exports = router;