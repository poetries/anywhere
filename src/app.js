const http = require("http");
const chalk = require("chalk"); // 改变输出样式
const path = require("path");
const fs = require("fs");
const conf = require("./config/default.config")

const sever = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url); // req.url 请求的路径，如：/abc/

	// 判断是文件夹还是文件
	fs.stat(filePath, (err, stats) => {
		if (err) {
			res.statusCode = 404;
			res.setHeader("Content-Type","text/plain");
			res.end(`${filePath} is not a directory or file`);
			return;
		}
		//文件
		if (stats.isFile()) {
			res.statusCode = 200;
			res.setHeader("Content-Type","text/plain");
			fs.createReadStream(filePath).pipe(res); // 把文件中的内容读出来流到res中返回
		} else if (stats.isDirectory()) { //文件夹 取得文件列表
			fs.readdir(filePath, (err, files) => {
				res.statusCode = 200;
				res.setHeader("Content-Type","text/plain");
				res.end(files.join(","));
			})
		}
	})

})

//监听端口
sever.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.info(`server started at ${chalk.green(addr)}`);
})