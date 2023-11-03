// Create web server
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var comments = [];

var server = http.createServer(function (request, response) {
    var parsed = url.parse(request.url);
    if (parsed.pathname == "/comment") {
        if (request.method == "POST") {
            var body = '';
            request.on('data', function (data) {
                body += data;
                if (body.length > 1e6) {
                    request.connection.destroy();
                }
            });
            request.on('end', function () {
                var post = qs.parse(body);
                comments.push(post.comment);
                console.log(comments);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end('Thank you for your comment!');
            });
        } else {
            var html = fs.readFileSync('comments.html');
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(html);
        }
    } else if (parsed.pathname == "/view") {
        var html = "<html><head><title>View Comments</title></head><body><h1>View Comments</h1><ul>";
        for (var i = 0; i < comments.length; i++) {
            html += "<li>" + comments[i] + "</li>";
        }
        html += "</ul></body></html>";
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("Not found");
    }
});

server.listen(8080);
console.log('Server is listening');