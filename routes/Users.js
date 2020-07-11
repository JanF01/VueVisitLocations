const express = require("express");
const Sequelize = require("sequelize");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = express.Router();
const User = require("../models/User.js");

users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        locationsVisited: 0
    };

    User.findOne({
        where: {
            username: userData.username,
        },
    }).then((user) => {
        if (!user) {
            let hash = bcrypt.hashSync(userData.password, 10);
            userData.password = hash;
            User.create(userData)
                .then((user) => {
                    user.dataValues.id = user.null;
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440,
                    });
                    res.json({
                        token: token,
                    });
                })
                .catch((error) => {
                    res.send("Error: " + error);
                });
        } else {
            res.send("Nick used");
        }
    }, (error) => {
        console.log(error);
    });
});

users.post("/login", (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
    };

    User.findOne({
        where: {
            username: userData.username,
        },
    }).then((user) => {
        if (user) {
            let pass = bcrypt.compareSync(userData.password, user.password);

            if (pass) {
                User.create(userData)
                    .then((user) => {
                        user.dataValues.id = user.null;
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        });
                        res.json({
                            token: token,
                        });
                    })
                    .catch((error) => {
                        res.send("Error: " + error);
                    });
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User does not exist")
        }
    }, (error) => {
        console.log(error);
    });
});


module.exports = users;