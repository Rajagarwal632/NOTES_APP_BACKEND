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

})

module.exports = {
    userroute
}