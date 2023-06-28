const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../routes/dbconfig');



const getmeetdets = async(req,res, next)=>{
    try{    
        const {mid} = req.params;
        const query1 = "SELECT e.name, m.meetid, m.Host, m.Department, m.Date, m.Time, m.Location, m.Agenda, m.zoom FROM meeting m JOIN employee e ON m.Host=e.employeeid WHERE meetid = ?;"
        db.query(query1, [mid], (err,result1)=>{
            if (err) return next(err);
            [req.meet] = result1;
            return next();
        })     
    }catch(err){
        next(err);
    }
}

const getattendees = async(req,res, next)=>{
    try{    
        const {mid} = req.params;
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        
        const query2 = "SELECT a.id, a.meetid, a.employeeid, e.name FROM attendees a JOIN employee e ON a.employeeid=e.employeeid WHERE meetid = ?";
        const result2 = await new Promise((resolve,reject)=>{
            db.query(query2, [mid], (err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        req.attendees = result2;
        
        const query3 = "SELECT COUNT(*) AS emp_Attending FROM attendees WHERE employeeid = ? AND meetid = ?";
        const result3 = await new Promise ((resolve,reject)=>{
            db.query(query3, [[decoded.id],[mid]], (err,result)=>{  
            if(err){
                 reject(err);
            }else{
                resolve(result);
            }
          });
        });
        if(result3[0].emp_Attending == 0){
            req.attending = {present:'no'};
        }else{
            req.attending = {present:'yes'};
        }
        // console.log(req.attending);
        return next();
    }catch(err){
        next(err);
    }
}

const putattendance = async(req, res)=>{
    try{
            const {mid} = req.params;
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
            const query="INSERT INTO attendees (meetid, employeeid) VALUES (? , ?)";
            db.query(query, [[mid], [decoded.id]], (err, result)=>{
                if(err) return next(err);
                console.log(result);
                return res.json({status:"success", success:"User is attending the meet"});
            })

    }catch(err){
        console.log(err);
    }
}

module.exports = {getmeetdets,getattendees, putattendance};