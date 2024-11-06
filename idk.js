

"use strict"
const express = require("express"), // npm install express
    fs = require("fs"),
    cors = require("cors")

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'  // Allow only your React frontend's origin
  }))

app.use(express.json())

// REQUESTS
app.post("/save", (req, res) => {

    // SE QU'ON RECOIT
    const content = req.body

    let formatedShit = Object.entries(content).reduce((a,b)=>a+=b[0]+":"+b[1]+"\n","")

    fs.writeFile(__dirname+"/public/test.txt", formatedShit,()=>{})
})

// SERVER
const server = app.listen(3000, "0.0.0.0", () => console.log("server up"))

 