const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencode
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const db = require("./app/models");
const tutorialRoutes = require("./app/routes/tutorial.routes");
app.use("/api/tutorials", tutorialRoutes());
db.mongoose
    .connect(db.url, {
        family: 4
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });