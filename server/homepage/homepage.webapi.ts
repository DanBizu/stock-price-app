import { getStockPriceBySymbol } from './homepage.service';
import http from 'http';
import url from 'url';

export function homepageRequestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    const parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;

    /** Remove / */
    path = path.replace(/^\/+|\/+$/g, "");

    switch (path) {
        case 'stock-prices': {

            getStockPriceBySymbol(req)
                .then(response => {
                    let headers: http.OutgoingHttpHeaders = {
                        'Access-Control-Allow-Origin': '*',
                    }
                    console.log('_+++data', response);
                    res.writeHead(200, headers);
                    res.end(response);
                });

            break;
        }
        default: return;
    }
}