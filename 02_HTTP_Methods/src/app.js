// Include express module
let express = require('express');

// Initialize the Express app
let app = express();

let port = 3000;

// Use express.json() to parse request body
app.use(express.json())

app.listen(port, () => {
    console.log("Express Server Listening at Port "+port);
});


// 1. HTTP GET Method
app.get('/getUserDetails', (req,res) => {
    res.send({
        'type': 'HTTP GET METHOD',
        'userId': 'USR-1',
        'name': 'Shubham',
        'address': 'Hyderabad'
    })
});


// req.params
app.get('/getUserDetailsParams/:userId/:name', (req,res) => {
    res.send({
        'type': 'HTTP GET METHOD & req.params',
        'userId': req.params.userId,
        'name': req.params.name,
        'address': 'Hyderabad'
    })
});


// req.query
app.get('/getUserDetailsQuery', (req,res) => {
    res.send({
        'type': 'HTTP GET METHOD & req.query',
        'userId': req.query.userId,
        'name': req.query.name,
        'address': 'Hyderabad'
    })
});


// req.body
// 2. HTTP POST Method
app.post('/postUserDetails', (req,res) => {
    res.send({
        'type': 'HTTP POST METHOD & req.body',
        'userId': req.body.userId,
        'name': req.body.name,
        'address': req.body.address
    })
})

// 3. HTTP PUT Method
app.put('/putUserDetails', (req,res) => {
    res.send({
        'type': 'HTTP PUT METHOD & req.body',
        'userId': req.body.userId,
        'name': req.body.name,
        'address': req.body.address
    })
})

// 4. HTTP DELETE Method
app.delete('/deleteUserDetails', (req,res) => {
    res.send({
        'type': 'HTTP DELETE METHOD & req.body',
        'userId': req.body.userId,
        'name': req.body.name,
        'address': req.body.address
    })
})
