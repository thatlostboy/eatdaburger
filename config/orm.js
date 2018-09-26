var connection = require("./config/connection.js")

// Taken mostly fro cat's app sample
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
        // cols is an array of columns
        // vals is an array of values
        // cb is callback function
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        // this creates INSERT INTO ( col1, col2 ) VALUES ( ?,?,?,? )
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

};

module.exports = orm;
