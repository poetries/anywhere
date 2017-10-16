/**
 * build cli
 */
const yargs = require("yargs");

const argv = yargs.usage("anwhere [options]").option("p", {
    alias: "port",
    describe:"端口号",
    default: 9527
}).option("h", {
    alias: "hostname",
    describe:"host",
    default: "127.0.0.1"
}).option("d", {
    alias: "root",
    describe:"root path",
    default: process.cwd()
})
.version()
.alias("v","version")
.help()
.argv;

