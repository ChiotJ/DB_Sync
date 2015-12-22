var table_Sync = require("./app/table_Sync.js");
var sync = table_Sync.sync;

sync("grade", "NJID");
sync("bclass", "BJID");

function pp() {
    var cur = table_Sync.getCur();
    var total = table_Sync.getTotal();
    var per = '0%';
    if (total != 0) {
        per = (cur / total).toFixed(4) * 100 + '%';
    }
    console.log(cur + "/" + total + "|" + per)
}

setInterval(function () {
    pp();
}, 1000);
