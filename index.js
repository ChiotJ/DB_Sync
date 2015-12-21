/**
 * Created by jian_ on 2015/12/21.
 */
var Client = require('mysql').Client,
    client = new Client(),
//要创建的数据库名
    TEST_DATABASE = 'nodejs_mysql_test',
//要创建的表名
    TEST_TABLE = 'test';

//用户名
client.user = 'root';
//密码
client.password = 'root';
//创建连接
client.connect();

client.query('CREATE DATABASE ' + TEST_DATABASE, function (err) {
    if (err && err.number != Client.ERROR_DB_CREATE_EXISTS) {
        throw err;
    }
});