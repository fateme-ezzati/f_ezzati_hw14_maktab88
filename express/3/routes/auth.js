const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const users = require("../db/users-data.json");

//load page
router.get("/signup", (req, res) => {

    res.sendFile(path.join(__dirname, "../views/pages/signup-page.html"))

});

router.get("/login", (req, res) => {

    res.sendFile(path.join(__dirname, "../views/pages/login-page.html"))

});

router.post("/signup/register", (req, res) => {
    console.log(req.body)

    const newUser = {
        firsname: req.body.firsname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        // gender: req.body.gender,
    };

    users.push(newUser);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/users-data.json"), JSON.stringify(users));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(newUser);
});


router.post("/login/register", (req, res) => {

    const user = {
        username: req.body.username,
        password: req.body.password,
    };

    const validUser = users.find(x => x.username === user.username);

    console.log(user,validUser)


    if(!validUser){
        return res.json('unvalid user name');
    }

    if(validUser && validUser.password !== user.password){
        return res.json('username and password are not match');
    }

    // try {
    // } catch (err) {
    //     console.log(err);
    //     return res.status(400).send("Try again later!")
    // };

    res.json('ok');
});

module.exports = router;