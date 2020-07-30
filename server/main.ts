import http from 'http';

const requestListener: http.RequestListener = function (req, res): http.Server {
  res.writeHead(200);
  res.end('Hello, World!');

  return {} as http.Server;
}

const server = http.createServer(requestListener);
server.listen(8080);