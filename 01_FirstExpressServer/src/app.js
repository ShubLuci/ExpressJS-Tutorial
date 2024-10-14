let express = require('express');

let app = express();

let port = 3000;

app.listen(port, () => {
    console.log("Server Listening at port ",port);
});

app.use('/hello', (req,res) => {
    res.send("Hello Shubham this is /hello endpoint running at port "+port);
});