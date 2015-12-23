/**
 * Created by jian_ on 2015/12/22.
 */
var DB_From_Query = require("./databases/app-pooling-92");
var DB_To_Query = require("./databases/app-pooling-136");
var total = 0;
var cur = 0;
var totalTable = 0;
var finishTable = 0;
var finish = true;

exports.sync = function (table, priKey) {
    finish = false;
    var totalSQL = "select count(*) as t from " + table;
    var selectSQL = "select * from " + table + " order by " + priKey;
    var updateSQL = "INSERT INTO " + table + " set ? ON DUPLICATE KEY UPDATE ?";
    var totalTableNum = 0;
    var curTableNum = 0;
    totalTable++;
    DB_From_Query(totalSQL, function (err, rows) {
        totalTableNum = rows[0].t;
        total += totalTableNum;
        console.log(table + "表总共有" + rows[0].t + '条数据,总共有数据' + total + "条");
        DB_From_Query(selectSQL, function (err, rows) {
            if (err) console.log(err);
            for (var i in rows) {
                DB_To_Query(updateSQL, [rows[i], rows[i]], function (errs, rowss) {
                    if (errs) console.log(errs);
                    curTableNum++;
                    cur++;
                    if (curTableNum == totalTableNum) {
                        console.log(table + "表同步完成");
                        finishTable++;
                        if (finishTable == totalTable) {
                            finish = true;
                        }
                    }
                });
            }
        });
    });
};

exports.getTotal = function () {
    return total;
};

exports.getCur = function () {
    return cur;
};

exports.reset = function () {
    total = 0;
    cur = 0;
    totalTable = 0;
    finishTable = 0;
};

exports.isFinish = function () {
    return finish;
};

