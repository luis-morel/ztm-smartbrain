// Just fooling around with "http" here
const http = require('http');

const server = http.createServer((request, response) => {
    console.log(
        "Request Headers:\n----------------\n",
        request.headers, "\n\n",
        "Request Method:\n---------------\n",
        request.method, "\n\n",
        "Request URL:\n------------\n",
        request.url, "\n\n"
    );
    const user = {
        name: 'Clark Kent',
        hobby: 'Saving the world'
    };
    // response.setHeader('Content-Type', 'text/html');
    response. setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
});

server.listen(5000);
