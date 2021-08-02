var log4js = require("log4js");
var config = require("./config")

function getLogger() {
    log4js.configure({
        appenders: {
            botkitlog: { type: 'dateFile', filename: config.logpath, compress: true }
            // errorlog: { type: 'dateFile', filename: config.errorlogpath, compress: true }
        },
        categories: { default: { appenders: ["botkitlog"], level: "debug" } }// errorfile: { appenders: ["errorlog"], level: "error" }
    });
    return log4js.getLogger()
}

module.exports = { getLogger }
