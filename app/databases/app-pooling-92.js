var mysql = require('mysql');
var pool = mysql.createPool({
    host: '211.153.82.92',
    user: 'gehua',
    password: 'gehua123',
    database: 'cmiss',
    port: 3306
});

var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (err, rows) {
                conn.release();
                callback(err, rows);
            });
        }
    });
};

module.exports = query;