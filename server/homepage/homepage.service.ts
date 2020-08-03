import http from 'http';
import https from 'https';
import url from 'url';

export function getStockPriceBySymbol(req: http.IncomingMessage): Promise<string> {
    let qs = url.parse(req.url, true).query;
    const { symbol, timeSeries } = qs;

    return new Promise<string>((resolve, reject) => {
        const request = https.request(`https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries.toString().toLocaleUpperCase()}&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`, res => {
            console.log(`statusCode: ${res.statusCode}`)

            let completeStream = Buffer.from('');
            res.on('data', data => {
                completeStream = Buffer.concat([completeStream, data]);
            })

            res.on('end', () => {
                resolve(completeStream.toString())
            });
        })

        request.on('error', error => {
            reject(error)
        })

        request.end();
    })
}