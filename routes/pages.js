const express = require('express');
const app = express();
const router = express.Router();
const logout = require('../controllers/logout');
const loggedIn = require("../controllers/loggedin");
const mymeet = require('../controllers/mymeet');

router.get("/", loggedIn, (req,res)=>{
        if(req.user){
            res.render("index", {status:"LoggedIn", user: req.user, currentPage: 'home'});
        }
        else{
            res.render("index", {status:"no", user: "nothing", currentPage: 'home'});
    }
})

router.get('/profile', loggedIn, (req,res)=>{
    if(req.user){
        res.render("profile", {status:"LoggedIn", user: req.user, currentPage: 'profile'} );
    }
    else{
        res.render("index", {status:"no", user: "nothing",currentPage: 'home'});
}
})

router.get('/search', (req,res)=>{
    res.render("searchbar", {searchMeets: "", currentPage: 'search'});
})

router.get('/mymeet', mymeet, (req,res)=>{
    if(req.meets){
        res.render("mymeet", {status:"Meetings Found", meets: req.meets, currentPage: 'mymeet'} );
    }
    else{
        res.render("index", {status:"no", user: "nothing", currentPage: 'home'});
}
})



router.get('/createmeet', loggedIn, (req,res)=>{
    if(req.userAccess.access == 'basic'){
        res.render("insuffauth");
    }else if(req.userAccess.access == 'higher'){
        res.sendFile("createmeet.html", {root:"./public", currentPage: 'home'});
    }
})
router.get('/login', (req,res)=>{
    res.sendFile("login.html", {root:"./public", currentPage: 'home'});
})
router.get('/logout', logout);

module.exports = router;