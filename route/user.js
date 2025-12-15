const {Router} = require("express")
const userroute = Router()
const {z} = require("zod")
const bcrypt = require("bcrypt")
const saltround = 10
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const JWT_USER = process.env.JWT_USER

const {usermodel} = require("../config/db")

userroute.post("/signup" , async function(req,res) {
    const reqbody = z.object({
        email : z.string().email(),
        password : z.string().min(3),
        name : z.string()
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    const hashpassword = await bcrypt.hash(password,saltround)

    await usermodel.create({
        email,
        password : hashpassword,
        name
    })
    res.json({
        msg : "USER CREATED"
    })
})

userroute.post("/signin" , async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const exist_user = await usermodel.findOne({
        email
    })
    if(!exist_user){
        res.json({
            msg : "USER NOT EXIST"
        })
        return
    }

    const password_match = bcrypt.compare(password,exist_user.password)
    if(password_match){
        const token = jwt.sign({
            userid : exist_user._id
        },JWT_USER)
        res.json({
            token : token
        })
    }else{
        res.json({
            msg : "INCORRECT PASSWORD"
        })
    }
})

module.exports = {
    userroute
}