const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

var Users = require("./routes/Users.js");

app.use("/api", Users);

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});