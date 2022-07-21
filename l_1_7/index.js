const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);

    res.write('<h1>Hello from NodeJS</h1>');
    res.write('<h2>Hello from NodeJS</h2>');
    res.write('<h3>Hello from NodeJS</h3>');
    // res.end();
    res.end(`
        <div style="background: red; width: 200px; height: 200px;">
            <h1>Test</h1>
        </div>
    `);
});

const hostname = 'localhost';
const port = 3000;

server.listen(port,() => {
   console.log(`Server is running at http://${hostname}:${port}/`)
});