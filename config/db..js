const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectid = Schema.ObjectId

mongoose.connect(process.env.MONGO_URL)

const user = new Schema({
    email : {type : String , unique : true ,required : true },
    password : {type : String},
    name : {type : String}
})

const notes = new Schema({
    title : String,
    content : String,
    userid : {type:objectid,ref : "user"},
    archived : {type : Boolean , default : false},
    createdat : {type: Date, default: Date.now},
    updatedat : {type: Date, default: Date.now}
})

//for search optimization
notesSchema.index({title : "text" , content : "text"})

const usermodel = mongoose.model("user" , user)
const notesmodel = mongoose.model("notes",notes)

module.exports = {
    usermodel,
    notesmodel
}