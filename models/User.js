const Sequelize = require("sequelize");
const db = require("../database/db.js");

const User = db.sequelize.define(
    "user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        locationsVisited: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false,
    }
);

module.exports = User;