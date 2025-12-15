require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { userroute } = require("./route/user")

app.use(express.json())
app.use("/user" , userroute)

async function main(){
    await mongoose.connect(process.env.MONGO_URL),
    app.listen(process.env.PORT)
    console.log(`listening to port ${process.env.PORT}\nconneted to mongoose\n`)
}
main()