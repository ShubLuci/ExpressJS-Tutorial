const express = require("express");
const { dbConnection } = require("../config/database");
const Books = require("../models/books");

const app = express();

let port = 3000;

// Establish Database Connection and Server Initialization before performing any task. IIFE
(async () => {
    await dbConnection();
    try {
        app.listen(port, () => {
            console.log(
                "SUCCESS > src/app.js > Server Connnection Established at port " +
                    port
            );
        });
        console.log("SUCCESS > src/app.js > MongoDB Connection Initialized");
    } catch (err) {
        let error = {
            statusCode: 404,
            name: err.name,
            message: err.message,
        };
        console.log("ERROR > src/app.js > Express Connection Failed");
        console.table(error);
    }
})();

// Used to Parse the JSON send via the API body
app.use(express.json());

// Register a New Book
app.post("/registerBook", async (req, res) => {
    const bookData = new Books(req.body);
    try {
        const response = await bookData.save();
        console.log(
            "SUCCESS > src/app.js > /registerBook > Insertion Successful"
        );
        res.send(response);
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log("ERROR > src/app.js > /registerBook > Insert Failed");
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /registerBook > Insert Failed"
        );
    }
});

// Fetch Book Details via _id field
app.get("/getBooksById", async (req, res) => {
    try {
        const response = await Books.findById({
            _id: req.query.id,
        });
        if (response.length != 0) {
            console.log(
                "SUCCESS > src/app.js > /getBooksById > Data Fetched Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /getBooksById > Data _id = ${req.query.id} Does Not Exist`
            );
            res.status(404).send("Data Does not Exist");
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log("ERROR > src/app.js > /getBooksById > Data Fetch Failed");
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /getBooksById > Data Fetch Failed"
        );
    }
});

// Fetch Book Details by Title
app.get("/getBooksByTitle", async (req, res) => {
    try {
        const response = await Books.findOne({
            title: req.query.title,
        });
        if (response != null) {
            console.log(
                "SUCCESS > src/app.js > /getBooksByTitle > Data Fetched Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /getBooksByTitle > Data title = ${req.query.title} Does Not Exist`
            );
            res.status(404).send(
                `ERROR > src/app.js > /getBooksByTitle > Data title = ${req.query.title} Does Not Exist`
            );
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /getBooksByTitle > Data Fetch Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /getBooksByTitle > Data Fetch Failed"
        );
    }
});

// Update exisiting book details via _id field
app.patch("/updateBookVolumeById", async (req, res) => {
    try {
        const response = await Books.findByIdAndUpdate(
            {
                _id: req.body.id,
            },
            { volumes: req.body.volumes },
            { returnDocument: "after" }
        );
        if (response != null) {
            console.log(
                "SUCCESS > src/app.js > /updateBookVolumeById > Data Updated Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /updateBookVolumeById > Data _id = ${req.body.id} Not Found`
            );
            res.status(404).send(
                `ERROR > src/app.js > /updateBookVolumeById > Data _id = ${req.body.id} Not Found`
            );
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /updateBookVolumeById > Data Update Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /updateBookVolumeById > Data Update Failed"
        );
    }
});

// Update exisiting book details via title field
app.patch("/updateBookVolumeByTitle", async (req, res) => {
    try {
        const response = await Books.findOneAndUpdate(
            {
                title: req.body.title,
            },
            { volumes: req.body.volumes },
            { returnDocument: "after" }
        );
        if (response) {
            console.log(
                "SUCCESS > src/app.js > /updateBookVolumeByTitle > Data Updated Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /updateBookVolumeByTitle > Data title = ${req.body.title} Not Found. Update Failed`
            );
            res.status(404).send(
                `ERROR > src/app.js > /updateBookVolumeByTitle > Data title = ${req.body.title} Not Found. Update Failed`
            );
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /updateBookVolumeByTitle > Data Update Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /updateBookVolumeByTitle > Data Update Failed"
        );
    }
});

// Delete existing record via _id field
app.delete("/deleteBookById", async (req, res) => {
    try {
        const response = await Books.findByIdAndDelete({
            _id: req.body.id,
        });
        if (response != null) {
            console.log(
                "SUCCESS > src/app.js > /deleteBookById > Data Deleted Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /deleteBookById > Data _id = ${req.body.id} Not Found. Deleted Failed`
            );
            res.status(404).send(
                `ERROR > src/app.js > /deleteBookById > Data _id = ${req.body.id} Not Found. Deleted Failed`
            );
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /deleteBookById > Data Deletion Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /deleteBookById > Data Deletion Failed"
        );
    }
});

// Delete existing record via title field
app.delete("/deleteBookByTitle", async (req, res) => {
    try {
        const response = await Books.findOneAndDelete({
            title: req.body.title,
        });
        if (response != null) {
            console.log(
                "SUCCESS > src/app.js > /deleteBookByTitle > Data Deleted Successfully"
            );
            res.send(response);
        } else {
            console.log(
                `ERROR > src/app.js > /deleteBookByTitle > Data title = ${req.body.title} Not Found. Deleted Failed`
            );
            res.status(404).send(
                `ERROR > src/app.js > /deleteBookByTitle > Data title = ${req.body.title} Not Found. Deleted Failed`
            );
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /deleteBookByTitle > Data Deletion Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /deleteBookByTitle > Data Deletion Failed"
        );
    }
});
