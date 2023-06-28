const express = require('express');
const router = express.Router();

const login = require('./login');
const createmeet = require('./createmeet');
const {getmeetdets,getattendees,putattendance} = require('../controllers/mompage');


router.get('/mompage/:mid', getmeetdets, getattendees, (req,res)=>{
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
        res.render("showmeet", {data:data});
    }else{
        res.render("showmeet", {status: "No meeting details found!"})
    }        
})

router.post('/mompage/:mid/attendance', putattendance, (req,res)=>{
    res.redirect(`/mompage/:${req.params.mid}`);
});

router.post('/createmeet', createmeet);
router.post('/login', login);

module.exports = router;