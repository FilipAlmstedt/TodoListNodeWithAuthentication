//Use the required npm packages
const express = require("express");

const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const todoFeatureRoute = require("./routes/todoFeaturesRoute");
const userRoute = require("./routes/userRoute");
const nodeSass = require("node-sass-middleware");


// Initiate express use
const app = express();

//Use models
const Todo = require("./model/todo");

//For sensitive information to ber secret
require("dotenv").config();

//Use for images/css, extra js 
app.use(express.static(__dirname + "/public"))

app.use(bodyParser.urlencoded({ extended: false }))

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
mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err)=> {
        if(err) return
        app.listen(process.env.PORT || 8002, () => {
            console.log("App currently running... ");
        })
    }
);

