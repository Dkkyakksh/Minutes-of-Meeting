const express = require('express');
const app = express();
const router = express.Router();
const logout = require('../controllers/logout');
const loggedIn = require("../controllers/loggedin");
const mymeet = require('../controllers/mymeet');

router.get("/", loggedIn, (req,res)=>{
        if(req.user){
            res.render("index", {status:"LoggedIn", user: req.user} );
        }
        else{
            res.render("index", {status:"no", user: "nothing"});
    }
})

router.get('/profile', loggedIn, (req,res)=>{
    if(req.user){
        res.render("profile", {status:"LoggedIn", user: req.user} );
    }
    else{
        res.render("index", {status:"no", user: "nothing"});
}
})

router.get('/search', (req,res)=>{
    res.render("searchbar", {searchMeets: ""});
})

router.get('/mymeet', mymeet, (req,res)=>{
    if(req.meets){
        res.render("mymeet", {status:"Meetings Found", meets: req.meets} );
    }
    else{
        res.render("index", {status:"no", user: "nothing"});
}
})



router.get('/createmeet', (req,res)=>{
    res.sendFile("createmeet.html", {root:"./public"});
})
router.get('/login', (req,res)=>{
    res.sendFile("login.html", {root:"./public"});
})
router.get('/logout', logout);

module.exports = router;