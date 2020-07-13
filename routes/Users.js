const express = require("express");
const Sequelize = require("sequelize");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = express.Router();


const User = require("../models/User.js");
const Marker = require("../models/markers.js");

const jwt_decode = require("jwt-decode");

const marker = require("../models/markerData");

users.use(cors());

process.env.SECRET_KEY = "secret-key-which-is-very-longpepeLaugh";

users.get("/public", (req, res) => {
    res.send(jwt_decode(req.headers["x-access-token"]));
});

users.get("/points", (req, res) => {
    let user = jwt_decode(req.headers["x-access-token"]);

    Marker.findAll({
        where: {
            userId: user.id,
        },
    }).then((markers) => {
        if (markers) {
            res.send(markers);
        }
    });
});

users.post("/addMarker", (req, res) => {
    var markerData = new marker.Data(req.body.userId,
        req.body.title,
        req.body.description,
        req.body.lat,
        req.body.lng,
        req.body.date);

    Marker.findOne({
        where: {
            lat: markerData.lat,
            lng: markerData.lng
        }
    }).then((marker) => {
        if (!marker) {
            Marker.create(markerData).then((point) => {

                res.send("Success");
            }).catch((error) => {
                res.send("Error");
            });
        } else {
            res.send("Marker exists");
        }
    })
})

users.post("/editMarker", (req, res) => {
    var markerData = new marker.Data(req.body.userId,
        req.body.title,
        req.body.description,
        req.body.lat,
        req.body.lng,
        req.body.date);


    Marker.findOne({
        where: {
            lat: markerData.lat,
            lng: markerData.lng
        }
    }).then(async function (marker) {
        if (marker) {
            marker.title = markerData.title;
            marker.description = markerData.description;
            marker.date = markerData.date;

            await marker.save().then((result) => {
                res.send("Success");
            });
        } else {
            res.send("Marker not found");
        }
    })
})

users.post("/register", (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        locationsVisited: 0,
    };

    User.findOne({
        where: {
            username: userData.username,
        },
    }).then(
        (user) => {
            if (!user) {
                let hash = bcrypt.hashSync(userData.password, 10);
                userData.password = hash;
                User.create(userData)
                    .then((user) => {
                        res.send("Success");
                    })
                    .catch((error) => {
                        res.send("Error: " + error);
                    });
            } else {
                res.send("Nick used");
            }
        },
        (error) => {
            console.log(error);
        }
    );
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
    }).then(
        (user) => {
            if (user) {
                let pass = bcrypt.compareSync(userData.password, user.password);

                if (pass) {
                    user.dataValues.userId = user.null;
                    let token = jwt.sign({
                            id: user.dataValues.id,
                            ezClap: user.dataValues.userId,
                            username: user.dataValues.username,
                            email: user.dataValues.email,
                            locationsVisited: user.dataValues.locationsVisited,
                        },
                        process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        }
                    );
                    res.send({
                        token: token,
                    });
                } else {
                    res.send("Wrong password");
                }
            } else {
                res.send("User does not exist");
            }
        },
        (error) => {
            console.log(error);
        }
    );
});

module.exports = users;