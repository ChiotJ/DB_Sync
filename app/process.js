/**
 * Created by jian_ on 2015/12/23.
 */
var table_Sync = require("./table_Sync.js");
var moment = require("moment");

var times = 0;
var curArr = [];
var printTime = 1000;
var cardinal = 20;
var bTotal = 0;
function pp() {
    var total = table_Sync.getTotal();
    var cur = table_Sync.getCur();
    var remain = total - cur;
    if (total == 0 || cur == 0) {
        curArr = [];
        //console.log("暂未开始同步，请稍候");
    } else {
        if (curArr.length < cardinal + 1) {
            curArr.push(cur);
        } else {
            curArr.shift();
            curArr.push(cur);
        }
        if (curArr.length < 5) {
            console.log("同步开始，正在收集数据");
            return;
        }

        var c = 0;
        for (var i = 1; i < curArr.length; i++) {
            c = c + (curArr[i] - curArr[i - 1]);
        }

        var avgCur = c / (curArr.length - 1);
        var timeSeed = (avgCur * 1000) / printTime;

        var remainTime = Math.round(remain / timeSeed);
        var per = '0%';
        if (total != 0) {
            per = (Math.round((cur / total) * 10000) / 100).toFixed(2) + "%";
        }

        console.log(cur + "/" + total + "|" + per + "|" + "还剩：" + timeCal(remainTime) + "");
    }

}

function timeCal(time) {
    var t = "";
    var ss = "";
    var mm = "";
    var hh = "";
    if (time > 60) {
        ss = time % 60;
        time = (time - ss) / 60;
        if (time > 60) {
            mm = time % 60;
            time = (time - mm) / 60;
            t = time + "时" + mm + "分" + ss + "秒"
        } else {
            t = time + "分" + ss + "秒"
        }
    } else {
        t = time + "秒"
    }
    return t;
}


module.exports = function (time) {
    printTime = time || 1000;
    pp();
    var ppInter = setInterval(function () {
        if (table_Sync.isFinish()) {
            console.log(table_Sync.getCur() + "/" + table_Sync.getTotal() + "|100%|本次同步结束时间-" + moment().format("YYYY-MM-DD HH:mm:ss"));
            table_Sync.reset();
            clearInterval(ppInter);
        } else {
            pp();
        }
    }, time);
};