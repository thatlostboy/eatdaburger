var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    add: function(burgerDesc, cb) {
        orm.insertOne("burgers", ['burger_name','devoured'],[burgerDesc, 0], function(res) {
            cb(res);
        });
    },    
    devour: function(burgerID, cb) {
        // change devour to true
        devourObj = { devoured: true }
        condition = "id = " + burgerID
        orm.updateOne("burgers", devourObj, condition, function(res) {
            cb(res);
        });
    },  
    clear: function(cb) {
        orm.deleteAll("burgers", function(res) {
            cb(res);
        });
    }


}

module.exports = burger;

/* 

testing burger.js object based on the ORM   

burger.add("New Burger!", function(result){
    console.log("New Burger Add Test:\n", result)
})

burger.devour("16",function(result){
    console.log("Deleted:\n", result )
})


burger.all(function(result){
    console.log("All List:\n", result )
})

*/


