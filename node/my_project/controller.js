const http = require('http');
const url = require('url');
module.exports = http.createServer((req, res) => {
    let service = require('./service.js');
    const reqUrl = url.parse(req.url, true);
    if (reqUrl.pathname == '/sample' && req.method == 'GET') {
        service.sampleRequest(req, res);
    } else if (reqUrl.pathname == '/test' && req.method == 'POST') {
        service.testRequest(req, res);
    } else {
        service.invalidRequest(req, res)
    }
})