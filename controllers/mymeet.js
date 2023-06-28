const db = require('../routes/dbconfig');
const jwt = require('jsonwebtoken');

const mymeet = async (req, res, next)=>{
    if(!req.cookies.userRegistered)return next();
    
        try{
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
            const host = decoded.id;
            // let query = "SELECT * FROM employee WHERE employeeid = ?";
            // db.query(query, [host], (err, result)=>{
            //     if(err) return next(err);
            //     req.user = result[0];
            // })
            let query = "SELECT name, Department FROM employee WHERE employeeid = ?;";
            db.query(query, [host],(err, result)=>{
                if(err) return next(err);
                // req.meets = result[0];
                db.query("SELECT e.name, m.meetid, m.Host, m.Department, m.Date, m.Time, m.Location, m.Agenda, m.zoom FROM meeting m JOIN employee e ON m.Host=e.employeeid WHERE m.Department = ? ORDER BY Date,Time ASC;", [result[0].Department], (err,result2)=>{
                    if(err) return next(err);
                    req.meets = result2;
                    return next();
                })
                })
            // console.log(dept);
            // query = "SELECT * from meeting WHERE Department = ?;";
            //     db.query(query, [dept], (err,result)=>{
            //         if(err) throw err;
            //         req.meets = result;
            //     })
        }catch(err){
            next(err);
        }
}
module.exports = mymeet;