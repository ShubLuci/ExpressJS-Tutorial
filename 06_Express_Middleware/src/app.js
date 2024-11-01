const express = require('express')
const {validateUser} = require('../middleware/validate.js')

const app = express()

const port = 3000

app.listen(port, () => {
    console.log("Server Listening at port "+port);
})

// Handling multiple routes
app.use("/userLogin", validateUser,
    (req,res,next) => {
        console.log("Genearte JWT Token, Response #1")
        next()
    },
    (req,res,next) => {
        console.log("Generate Access Tokes, Response #2")
        next()
    },
    (req,res,next) => {
        console.log("Authenticate the User, Response #3")
        res.send("Response #3");
    }
)