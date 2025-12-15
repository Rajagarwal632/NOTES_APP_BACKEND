const JWT_USER = process.env.JWT_USER
const jwt = require("jsonwebtoken")

function userauth(req,res,next){
    const token = req.headers.token
    const decodeddata = jwt.verify(token,JWT_USER)
    if(decodeddata){
        req.userid = decodeddata.userid
        next()
    }else{
        res.json({
            msg : "NOT AUTHORISED"
        })
    }
}

module.exports = {
    userauth
}