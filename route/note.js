const {Router} = require("express")
const noteroute = Router()
const {z} = require("zod")

const mongoose = require("mongoose")
const {notesmodel } = require("../config/db")
const {userauth} = require("../middleware/userauth")

noteroute.post("/",userauth , async function(req,res){
    const reqbody = z.object({
        title : z.string(),
        content : z.string()
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }
    const title = req.body.title
    const content = req.body.content
    const userid = req.userid
    await notesmodel.create({
        title,
        content,
        userid
    })
    res.json({
        msg : "NOTE CREATED"
    })
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