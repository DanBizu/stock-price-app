import { homepageRequestHandler } from './homepage/homepage.webapi';
import { SERVER_CFG } from './server-cfg';
import http from 'http';
// import url from 'url';

const requestListener: http.RequestListener = function (req, res) {
    // let parsedUrl = url.parse(req.url, true);
    // console.log('+++ parsedUrl', parsedUrl);
    // let qs = parsedUrl.query;
    // console.log('+++ qs', qs);
    // let headers: http.OutgoingHttpHeaders = {
    //     'Access-Control-Allow-Origin': '*',
    // }
    // res.writeHead(200, headers);
    // res.end('Hello, World!');
    homepageRequestHandler(req, res);
}

const server = http.createServer(requestListener);
server.listen(SERVER_CFG.PORT, () => {
    console.log(`Server running at ${SERVER_CFG.HOSTNAME}:${SERVER_CFG.PORT}`);
});