const url = require('url');
exports.sampleRequest = (req, res) => {
    const reqUrl = url.parse(req.url, true);
    let name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }
    let response = {
        'text': 'Hello ' + name
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}
exports.testRequest = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body = chunk;
    })
    console.log(body)
    req.on('end', () => {
        const postBody = JSON.parse(body);
        let response = {
            'text': 'Post Request Value is ' + postBody.value + postBody.name
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response))
    })
}
exports.invalidRequest = (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('Invalid Request 404');
}