const express = require('express');
const router = express.Router();

const searchquery = require('./searchres');
const login = require('./login');
const createmeet = require('./createmeet');
const {getmeetdets,getattendees,putattendance, momap, getmomap, updateMomap, deleteMomap} = require('../controllers/mompage');

router.get('/searchres', searchquery, (req,res)=>{
    if(req.searchMeets){
        res.render("searchbar", {searchMeets: req.searchMeets});
    }
})

router.get('/mompage/:mid', getmeetdets, getattendees, getmomap, (req,res)=>{
    if(req.meet){    
        const data = {
            status: "Meeting details Loaded",
            meet: req.meet
        };
        if(req.attendees.length>0 && Array.isArray(req.attendees)){    
            data.attendees = req.attendees;
        } 
        if(req.attending){
            data.attending = req.attending;
        }
        if(req.meetmomap){
            data.meetmomap = req.meetmomap;
        }
        res.render("showmeet", {data:data});
    }else{
        res.render("showmeet", {status: "No meeting details found!"})
    }        
});

router.post('/mompage/:mid/attendance', putattendance, (req,res)=>{
    res.redirect(`/mompage/:${req.params.mid}`);
});

router.post('/mompage/momap', momap, (req,res)=>{
});

router.post('/createmeet', createmeet);
router.post('/login', login);

router.patch("/mompage/update", updateMomap, (req,res)=>{
})

router.delete("/mompage/delete/:momapid", deleteMomap, (req,res)=>{
})

module.exports = router;