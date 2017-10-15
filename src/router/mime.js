/**
 * MIME 返回给浏览器解析的类型
 */

 const path = require("path");

 const mimeTypes = {
     "css": "text/css",
     "gif": "image/gif",
     "html": "text/html",
     "ico": "image/x-icon",
     "jpg": "image/jpeg",
     "jpeg": "image/jpeg",
     "js": "text/javascript",
     "pdf": "application/pdf",
     "png": "image/png",
     "svg": "image/svg+xml",
     "swf": "application/x-shockwave-flash",
     "tiff": "image/tiff",
     "txt": "text/plain",
     "xml": "text/xml",
     "json": "text/javascript"
 };

 module.exports = (filePath) => {
     let ext = path.extname(filePath).split(".").pop().toLowerCase();// 读取文件的后缀

     if (!ext) {
         ext = filePath;
     }
     return mimeTypes[ext] || mimeTypes['txt']; //如果匹配不到，当成普通文本处理

 }