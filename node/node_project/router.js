exports.route = (pathname, handle, response, postdata, connection) => {
    if (handle[pathname] && typeof handle[pathname] === 'function') {
        handle[pathname](response, postdata, connection);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 not found');
        response.end();
    }
}