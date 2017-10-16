const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/default.config');
const route = require('./router/index');


const server = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url);
	route(req, res, filePath, conf);
  });

  server.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.info(`Server started at ${chalk.green(addr)}`);
  });
  