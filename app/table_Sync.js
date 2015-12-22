/**
 * Created by jian_ on 2015/12/22.
 */
var query92 = require("./databases/app-pooling-92");
var query136 = require("./databases/app-pooling-136");
var total = 0;
var cur = 0;

exports.sync = function (table, priKey) {
    var totalSQL = "select count(*) as t from " + table;
    var selectSQL = "select * from " + table + " order by " + priKey;
    var updateSQL = "INSERT INTO " + table + " set ? ON DUPLICATE KEY UPDATE ?";

    query92(totalSQL, function (err, rows) {
        total += rows[0].t;
        console.log(table + "表总共有" + rows[0].t + '条数据,总共有数据' + total + "条");
        query92(selectSQL, function (err, rows) {
            if (err) console.log(err);
            for (var i in rows) {
                query136(updateSQL, [rows[i], rows[i]], function (errs, rowss, id) {
                    if (errs) console.log(errs);
                    cur++;
                    //console.log("---------------------" + cur + "/" + total + "|" + toPercent(cur / total) + "---------------------");
                    //console.log(id + " - SUCCESS - " + rowss.affectedRows);
                }, rows[i][priKey]);
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


