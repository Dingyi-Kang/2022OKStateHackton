// Import the data model and all required libaries
var express = require('express');
var app = express();
var mongoose = require('mongoose')
const Data = require("./userModel.js");
const assert = require("assert");

// Connect to the database
mongoose.connect("mongodb://localhost/newDB");
// Tell us whether is connection was successful or not
mongoose.connection.once("open", () => {
    console.log("Connected!");
}).on("error", function(error) {
    console.log("Connection Error:", error);
});

// When localhost:8081/fetch is pinged return all items in the Data collection
app.get('/fetch', (req, res) => {
    Data.find({
      userId: req.get("userId")
    }).then((userInfo) => { // return all items in the datas collection
        res.send(userInfo)
    });
});

// When the delete route is called seach the database using the ID header and delete that item
app.post('/delete', (req, res) => {
    Data.findOneAndRemove({
      userId: req.get("userId")
    }, function(err) {});
    res.send("Done")
})

// To update, look for the item with the given ID and update all the vakues with the new header values
app.post('/update', (req, res) => {
    Data.update({
      userId: req.get("userId")
    }, {
        userId: req.get("userId"),
        speed: req.get("speed"),
        location: req.get("location")
    }, {
        upsert: true
    }, (err) => {})
    res.send("Done")
});

// Create a new data object with the headers and input it into the DB
app.post("/create", (req, res) => {
    var info = new Data({ userId: req.get("userId"), speed: req.get("speed"), location: req.get("location") })
    res.send("Done")
    info.save().then(() => {
        assert(info.isNew == false);
    });
    console.log("Saved");
    console.log(info);
})

// Start the server on localhost:8081
var server = app.listen(8081, "10.228.11.187", () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});