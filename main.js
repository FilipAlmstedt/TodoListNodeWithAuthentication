//Use the required npm packages
const express = require("express");

const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");

const todoFeatureRoute = require("./routes/todoFeaturesRoute");
const userRoute = require("./routes/userRoute");
const nodeSass = require("node-sass-middleware");

// Initiate express use
const app = express();

//Use models
const Todo = require("./model/todo");

//import env variables from config.js
const {database, databasePort} = require("./config/config")

//Use for images/css, extra js 
app.use(express.static(__dirname + "/public"))

app.use(bodyParser.urlencoded({ extended: false }))
//Use for express-flash/express-session
app.use(session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: false
}));
app.use(flash());
app.use(cookieParser());

//Use SASS in this project
app.use(nodeSass({
    src: __dirname + "/scss",
    dest: __dirname + "public/css"
}))

//Use ejs template
app.set("view engine", "ejs")

//router middlewares 
app.use("/", todoFeatureRoute)
app.use(userRoute)

//Connect to DB
mongoose.connect(database, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err)=> {
        if(err) return
        app.listen(databasePort || 8002, () => {
            console.log("App is up and running... ");
        })
    }
);

