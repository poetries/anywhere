const fs = require("fs");
const path = require("path");
const HandleBars = require("handlebars");
const promisify = require("util").promisify; //优化异步请求
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const conf = require("../config/default.config");
const mime = require("../router/mime");

const source = fs.readFileSync(path.join(__dirname, "../temple/dir.tpl"),"utf-8"); //readFileSync默认读出来的是Buffer，需要utf8转成字符串或者toString
const template = HandleBars.compile(source); //生成template模板

module.exports = async function (req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        //文件
        if (stats.isFile()) {
            const contentType = mime(filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type",contentType+";charset=utf-8");
            fs.createReadStream(filePath).pipe(res); // 把文件中的内容读出来流到res中返回
        } else if (stats.isDirectory()) { //文件夹 取得文件列表
            const files = await readdir(filePath); //所有的异步调用都需要包裹在一个async函数里面
            const dir = path.relative(config.root, filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/html;charset=utf-8");
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}`:"",
                files: files.map(file=> {
                    return {
                        file,
                        icon:mime(file)
                    }
                })
            }
            res.end(template(data));
        }
    } catch (ex) {
        res.statusCode = 404;
        res.setHeader("Content-Type","text/plain");
        res.end(`${filePath} is not a directory or file\n ${ex.toString()}`);
    }
}