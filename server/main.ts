import { homepageRequestHandler } from './homepage/homepage.webapi';
import { SERVER_CFG } from './server-cfg';
import http from 'http';

const requestListener: http.RequestListener = function (req, res) {
    homepageRequestHandler(req, res);
}

const server = http.createServer(requestListener);
server.listen(SERVER_CFG.PORT, () => {
    console.log(`Server running at ${SERVER_CFG.HOSTNAME}:${SERVER_CFG.PORT}`);
});