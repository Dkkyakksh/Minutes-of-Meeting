const db = require('../routes/dbconfig');

const searchquery = async(req,res,next)=>{
    try{
        const status = req.query.status;
        const Sdate = req.query.Sdate;
        const Sdept = req.query.Sdept;
        if(Sdate != "" && Sdept == "Choose..."){
            const query1 = "SELECT * FROM meeting WHERE DATE(Date) = ?";
            // const params = [Sdate];
            // const dbquery = db.format(query1,params);
            // console.log(dbquery);
            db.query(query1, [new Date(Sdate).toISOString()], (err,result)=>{
                if(err) return next(err);
                // console.log(result);
                req.searchMeets = result;
                return next();
            })
        }else if(Sdate != "" && Sdept != "Choose..."){
            const query1 = "SELECT * FROM meeting WHERE Department = ? AND DATE(Date) = ?";
            // const params = [Sdept,Sdate];
            // const dbquery = db.format(query1,params);
            // console.log(dbquery);
            db.query(query1, [Sdept, new Date(Sdate).toISOString()], (err,result)=>{
                if(err) return next(err);
                // console.log(result);
                req.searchMeets = result;
                return next();
            })
        }else if(Sdept != "Choose..." && Sdate == ""){
            const query1 = "SELECT * FROM meeting WHERE Department = ?";
            // const params = [Sdept];
            // const dbquery = db.format(query1,params);
            // console.log(dbquery);
            db.query(query1, [Sdept], (err,result)=>{
                if(err) return next(err);
                // console.log(result);
                req.searchMeets = result;
                return next();
            })
        }
    }catch(err){
        next(err);
    }   
}


module.exports = searchquery;