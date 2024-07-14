const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const collection = require("./config");

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join (__dirname,'public')));

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/learning_module", (req, res) => {
    res.render("learning_module");
});

app.get("/home", (req, res) => {
    res.render("home");
});


app.get('/public/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/style.css'));
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User does not exist");
        } else {
            const isPassword = await bcrypt.compare(req.body.password, check.password);
            if (isPassword) {
                res.redirect("/home");
            } else {
                res.send("Wrong password");
            }
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred. Please try again.");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});