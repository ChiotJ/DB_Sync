var table_Sync = require("./app/table_Sync");
var process = require("./app/process");
var moment = require("moment");
var sync = table_Sync.sync;

function sync_once() {
    console.log("同步开始，本次同步开始时间-" + moment().format("YYYY-MM-DD HH:mm:ss"));
    sync("grade", "NJID");
    //sync("bclass", "BJID");
}

sync_once();
process(1000);

setInterval(function () {
    sync_once();
    process(1000);
}, 60 * 1000 * 2);


