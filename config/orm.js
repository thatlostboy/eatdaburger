var connection = require("../config/connection.js")


// Helper function to convert object key/value pairs to SQL syntax
// Taken from the Cat's example 
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}



// Taken mostly fro cat's app sample with my notes added in
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    // creates array of "[?,?,?,?]" based on length of val

    return arr.toString();
    // returns '?,?,?,?'
}



// Taken mostly fro cat's app sample

var orm = {
    selectAll: function (table, cb) {
        var queryString = "SELECT * FROM " + table;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result)
        });
    },
    insertOne: function (table, cols, vals, cb) {
        // table is a string
        // cols is an array of columns, we'll use [x]
        // vals is an array of values, 
        // cb is callback function
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        // this creates INSERT INTO ( col1, col2, col3, col4 ) VALUES ( ?,?,?,? )
        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            // this replaces the ?  with the array "vals"
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // need to update this one better
    updateOne: function (table, objColVals, condition, cb) {

        /*
        sample mysql update:  
            UPDATE Customers
            SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
            WHERE CustomerID = 1;
        */

        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    deleteAll: function (table, cb) {
        var queryString = "DELETE FROM " + table;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};


module.exports = orm;


/*
// testing orm functions
// test select all
orm.selectAll('burgers',function(result) {
    console.log("CB results:\n", result)
})


// test insert new burger
orm.insertOne('burgers',['burger_name','devoured'],['WZ Test Burger',false],function(result){
    console.log("CB results:\n", result)
})


// test update burger with object and condition,
//  timeout put in so that burger is created first.   
updateObject = {
    burger_name: "VWs test burger3 again",
    devoured: true
}

updateObject1 = {
    devoured: true
}

// had to update the id accordingly with the seeded data 
orm.updateOne('burgers', updateObject, 'id = 11', function(result){
    console.log("CB results:\n", result)
})

*/



