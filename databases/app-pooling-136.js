var mysql = require('mysql');
var pool = mysql.createPool({
    host: '10.191.255.136',
    user: 'root',
    password: 'root123',
    database: 'cmiss',
    port: 3306
});

var query = function (sql, post, callback, id) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            var q = conn.query(sql, post, function (err, rows) {
                conn.release();
                callback(err, rows, id);
            });
            //console.log(q.sql)
        }
    });
};

module.exports = query;