const db = require('../routes/dbconfig');
const  jwt = require('jsonwebtoken');

const createmeet = async (req,res)=>{
    if(!req.cookies.userRegistered) return next();
    
    else{
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        const host = decoded.id;
        const {department, date, time, location, agenda, zoomlink} = req.body;
        const query = "INSERT INTO meeting (Host, Department, Date, Time, Location, Agenda, zoom) VALUES (?,?,?,?,?,?,?)";
        db.query(query, [host, department, date, time, location, agenda, zoomlink], (err,result)=>{
            if(err) throw err;
            console.log(result);
            return res.json({status:"success", success: "Meeting has been created"});
        })
    }
}
module.exports = createmeet;