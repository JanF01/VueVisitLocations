const Sequelize = require("sequelize");
const db = require("../database/db.js");

const Marker = db.sequelize.define(
  "marker", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    lat: {
      type: Sequelize.DECIMAL
    },
    lng: {
      type: Sequelize.DECIMAL
    },
    date: {
      type: Sequelize.DATE
    },
  }, {
    timestamps: false,
  }
);

module.exports = Marker;