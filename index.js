/**
 * Created by jian_ on 2015/12/21.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '10.191.255.136',
    user: 'root',
    password: 'root123',
    database:'cmiss',
    port: 3306
});
conn.connect();
conn.query('SELECT * from student limit 1', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});
conn.end();