const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./db/connect')
const userModel = require('./models/userModel')


const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())

server.get("/logger", async (req, res) => {
  const allUsers = await userModel.find();
  // console.log(allUsers)
  return res.json(allUsers);
});



const SERVER_PORT = 8080
server.listen(SERVER_PORT, () => {
  console.log(`Server has been started on port ${SERVER_PORT}...`);
  connectDB()
})
