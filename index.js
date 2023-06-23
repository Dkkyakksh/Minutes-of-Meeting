//manages everything
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
const cookie = require('cookie-parser');
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/js", express.static(__dirname + "/public/js"))
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));
app.set("view engine", "ejs");
app.set("views", "./views");

//import db
const db = require("./routes/dbconfig");
db.connect((err)=>{
    if(err) throw err;
    console.log("Connected");
});

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));


app.listen(5000, ()=>{
    console.log("App is running!");
})
