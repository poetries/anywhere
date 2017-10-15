const http = require("http");
const chalk = require("chalk"); // 改变输出样式
const path = require("path");
const route = require("./router/index");
const conf = require("./config/default.config")

const sever = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url); // req.url 请求的路径，如：/abc/
	route(req, res, filePath); //处理路由
})

//监听端口
sever.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.info(`server started at ${chalk.green(addr)}`);
})