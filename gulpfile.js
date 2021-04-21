const { src, dest, watch, series, parallel } = require('gulp');
const connect = require('gulp-connect') //服务器
const concat = require('gulp-concat') //合并文件
// const uglify = require('gulp-uglify'); //压缩js 不支持ES6 
const uglify = require('gulp-uglify-es').default; // ES6压缩
const cleanCSS = require('gulp-clean-css'); //压缩 css
const htmlmin = require('gulp-htmlmin'); //压缩html
const image = require('gulp-image');//压缩img
const del = require('del');//删除文件
const process = require('process');//删除文件
const shell = require('shelljs'); //命令行操作
const c = require('child_process');
//压缩js
function zipjs(){
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js/'))
}
//压缩css
function zipcss(){
  return src('src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css/'))
}
//压缩html
function zipHtml() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'))
}
//压缩图片
function zipImg() {
  return src('src/images/**/*')
    .pipe(image())
    .pipe(dest('dist/images/'))
    .pipe(connect.reload())

}
//删除打包项目文件
async function clean(){
  await del.sync(['dist']);
}
//创建源文件服务器
function dev(){
  connect.server({
    name:'dev App',
    root:'src',
    port:'8080',
    livereload:true,
    host: '::'
  });
  openBrowser('8080');
  
}
//服务器自动刷新函数
function htmlReload(){
  return src('src/*.html')
    .pipe(connect.reload())
}
//监测文件变化自动刷新 
//connect.reload() 放到这里不能刷新
function watchAll(){
  return watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'], htmlReload)
}
// 创建打包后服务器
function distServer(){
  connect.server({
    name:'dist App',
    root: 'dist',
    port:'9000',
    host: '::'
  });
  openBrowser('9000');
}

//获取主机地址
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
//设置浏览器中打开项目 
// 可以自定义传入端口
// 可以自定义传入端口
function openBrowser(port = 8080) {
  // 打开浏览器方法：
  let IPAdd = getIPAddress();
  let url = `http://${IPAdd}:${port}`;
  // 拿到当前系统的参数
  switch (process.platform) {
    //mac系统使用 一下命令打开url在浏览器
    case "darwin":
      c.exec(`open ${url}`);
    //win系统使用 一下命令打开url在浏览器
    case "win32":
      c.exec(`start ${url}`);
    // 默认mac系统
    default:
      c.exec(`open ${url}`);
  }
}

//打开本地测试服务器
exports.dev = parallel(watchAll,dev);
//删除打包项目
exports.clean = clean; 
exports.zipjs = zipjs;
// 浏览器打开打包项目
exports.distServer = distServer;
//打包项目
exports.default = series(clean, zipjs, zipcss, zipHtml, zipImg, distServer)