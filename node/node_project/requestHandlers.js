// const exec = require('child_process').exec;
const queryString = require('querystring');

exports.start = (res, postdata, connection) => {
    console.log(postdata);
    const data = JSON.parse(postdata);
    const sql = `insert into user (id, name, status, reg_time) values (1234567891, ${data.name}, ${data.status}, ${data.reg_time})`;
    let str = '';
    connection.query(sql, (err) => {
        if (err) return console.log(err.message);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('插入成功');
        res.end();
    })
}
exports.upload = (res, postdata) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(str)
    console.log('query:' + queryString.parse(postdata).value);
    console.log(JSON.parse(postdata).value);
    res.end();
}