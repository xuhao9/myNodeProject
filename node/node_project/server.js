const http = require('http');
const url = require('url');
const formidable = require('formidable');
const util = require('util');
const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'gz-cdbrg-9eux4e75.sql.tencentcdb.com',
//     port: '61594',
//     user: 'xuhao',
//     password: '086a6d5657a4',
//     database: 'wph_test'
// })
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234567890',
    database: 'my_blog'
})
connection.connect(err => {if (err) console.log(err);});
exports.start = (route, handle) => {
    const server = http.createServer(onRequest);
    server.listen(8888);
    console.log('Server Listen at 8888');
    function onRequest (req, res){
        const pathname = url.parse(req.url).pathname;
        let postdata = '';
        req.setEncoding('utf8');
        req.addListener('data', chunk => {
            postdata += chunk;
        });
        req.addListener('end', () => {
            route(pathname, handle, res, JSON.stringify(postdata), connection);
            // const data = JSON.parse(postdata);
            // const sql = `insert into user (name, status, reg_time) values ('${data.name}', ${data.status}, '${getDate(2)}')`;
            // console.log(sql)
            // let str = '';
            // connection.query(sql, (err) => {
            //     if (err) return console.log(err.message);
            //     res.writeHead(200, {'Content-Type': 'text/html'});
            //     res.write('插入成功');
            //     res.end();
            // })
        })
        // const sql = "select * from t_flow_user_behavior where widget_title = '寻找手机'";
        // const sql = 'select * from user where name = "zhangsan"';
        // const sql = 'insert into user (id, name, status, reg_time) values (1234567891, "zhangsan", 1, "2019-09-09 14:13:34")';
        // let str = '';
        // connection.query(sql, (err) => {
            // if (err) return console.log(err.message);
            // const sql2 = 'select * from user union select date_format(NOW(), "%Y-%m-%d %H:%m:%S") AS reg_time';
            // connection.query(sql2, (err2, val) => {
            //     str = JSON.stringify(val);
            //     if (err2) str = JSON.stringify(err2);
            //     res.writeHead(200, {'content-type': 'text/html'});
            //     res.end(str)
            // })
        // })
    }
}

function getDate (key) { // 1 获取年月日 2 获取年月日时分秒
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = now.getDate();
    day = day < 10 ? '0' + day : day;
    if (key === 1) return year + '-' + month + '-' + day;
    let hours = now.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let min = now.getMinutes();
    min = min < 10 ? '0' + min : min;
    let seconds = now.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds;
}