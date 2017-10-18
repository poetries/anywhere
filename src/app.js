const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/default.config');
const route = require('./router/index');
const openUrl = require('./router/openUrl');

class Server {
	constructor(config) {
		this.conf = Object.assign({}, conf, config);
	}
	start() {
		const server = http.createServer((req, res) => {
			const filePath = path.join(this.conf.root, req.url);
			route(req, res, filePath, this.conf);
			});
		
			server.listen(this.conf.port, this.conf.hostname, () => {
				const addr = `http://${this.conf.hostname}:${this.conf.port}`;
				console.info(`Server started at ${chalk.green(addr)}`);
				openUrl(addr);
			});
	}
}
	
module.exports = Server;