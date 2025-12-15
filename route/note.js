const {Router} = require("express")
const noteroute = Router()
const {z} = require("zod")

const mongoose = require("mongoose")

noteroute.post("/",userauth , async function(req,res){
    
})
noteroute.put("/:id",userauth , async function(req,res){

})
noteroute.delete("/:id",userauth , async function(req,res){

})
noteroute.get("/",userauth , async function(req,res){

})
noteroute.get("/search",userauth , async function(req,res){

})
noteroute.patch("/:id/archive",userauth , async function(req,res){

})

module.exports = {
    noteroute
}