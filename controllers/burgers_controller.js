var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use 
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

// HTML Page routes
router.get("/", function(req, res) {
  burger.all(function(data) {
    var burgerObject = {
      burgers: data
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
  });
});


// API routes

// route to add a burger
router.post("/api/burgers", function(req, res) {
  newburger = req.body.burger_name
  console.log("Display Add:\n",newburger)
  burger.add(newburger, function(result){
    console.log(result)
  });
});


// route to update a burger as eaten
router.put("/api/burger/:id", function(req, res) {
  var burgerID =  req.params.id;
  burger.devour(burgerID, function(result) {
      console.log(result)
  });
});


// Export routes for server.js to use.
module.exports = router;