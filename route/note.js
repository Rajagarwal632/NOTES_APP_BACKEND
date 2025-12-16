const {Router} = require("express")
const noteroute = Router()
const {z} = require("zod")

const mongoose = require("mongoose")
const {notesmodel, usermodel } = require("../config/db")
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
    const userid = req.userid
    const note_id = req.params.id
    const update = z.object({
        title : z.string().optional(),
        content : z.string().optional()
    })
    const parsedatawithsucess = update.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
    }
    const title = req.body.title
    const content= req.body.content
    const update_note = await notesmodel.findOneAndUpdate({
        userid : userid,
        _id : note_id
    },{
        title,
        content
    })
    if(update_note){
        res.json({
            msg : "NOTE UPDATED PLEASE CHECK"
        })
    }else{
        res.json({
            msg : "EITHER USER_ID OR NOTE_ID NOT MATCHED"
        })
    }
})
noteroute.delete("/:id",userauth , async function(req,res){
    const userid = req.userid
    const note_id = req.params.id
    const delete_note = await notesmodel.findOneAndDelete({
        _id : note_id,
        userid:userid
    })
    if(delete_note){
        res.json({
            msg : "NOTE DELETED"
        })
    }else{
        res.status(404).json({
            msg : "NOTE NOT FOUND"
        })
    }
})
noteroute.get("/",userauth , async function(req,res){
    const userid = req.userid
    const notes = await notesmodel.find({
        userid
    })
    res.json({
        msg : "ALL NOTES ARE :-",
        notes : notes
    })
})
noteroute.get("/search",userauth , async function(req,res){

})
noteroute.patch("/:id/archive",userauth , async function(req,res){

})

module.exports = {
    noteroute
}