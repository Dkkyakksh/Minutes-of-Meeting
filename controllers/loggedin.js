const db = require("../routes/dbconfig");
const jwt = require("jsonwebtoken");

const loggedIn = (req,res,next)=>{
    if(!req.cookies.userRegistered) return next();

    try{
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query("SELECT * FROM employee WHERE employeeid = ?", [decoded.id], (err,result)=>{
            if(err) return next(err);
            req.user = result[0];
            //this can be accessed in the subsequent middleware or route handlers
            //if user is not authenticated then next() present below will execute
            return next();
        })
//db.query('SELECT)
    }catch(err){
        next(err);
    }
}
module.exports = loggedIn;