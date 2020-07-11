const Sequelize = require("sequelize");

var db = {};

const sequelize = new Sequelize("locationVue", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
