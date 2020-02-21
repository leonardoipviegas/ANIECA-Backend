var mysql = require("mysql");
// Pool for db connections
var pool = mysql.createPool(require("../config.json").db_conn);

myQuery = function(queryString, values, callback) {
  if (pool) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      //execute the queryString
      connection.query(queryString, values, function(error, results, fields) {
        if (error) {
          callback(error);
        } else {
          callback(false, results);
        }
      });
      connection.release();
    });
  } else {
    callback(true);
  }
};

module.exports = {
  Qgen_accounts: require("./Qaccount")(myQuery)
};
