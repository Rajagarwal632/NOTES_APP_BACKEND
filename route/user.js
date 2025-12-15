const {Router} = require("express")
const userroute = Router()
const {z} = require("zod")
const bcrypt = require("bcrypt")
const saltround = 10
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const JWT_USER = process.env.JWT_USER

const {usermodel} = require("../config/db")

userroute.post("signup" , async function(req,res) {
    
})

userroute.post("/signin" , async function(req,res){

})

module.exports = {
    userroute
}