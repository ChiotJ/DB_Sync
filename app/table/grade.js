var query92 = require("../databases/app-pooling-92");

var query136 = require("../databases/app-pooling-136");

var totalSQL = "select count(*) as t from grade";
var selectSQL = "select * from grade order by NJID";
var updateSQL = "INSERT INTO grade set ? ON DUPLICATE KEY UPDATE ?";

function sync() {
    query92(totalSQL, function (err, rows) {
        var total = rows[0].t;
        var cur = 0;
        console.log("总共有" + total + '条数据');
        query92(selectSQL, function (err, rows) {
            if (err) console.log(err);
            for (var i in rows) {
                query136(updateSQL, [rows[i], rows[i]], function (errs, rowss, id) {
                    if (errs) console.log(errs);
                    cur++;
                    console.log("---------------------" + cur + "/" + total + "---------------------");
                    //console.log(id + " - SUCCESS - " + rowss.affectedRows);
                }, rows[i].NJID);
            }
        });
    });
}


