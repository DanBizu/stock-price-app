import { SERVER_URL } from '../../shared/server-cfg';

export function apiCall(symbol: string) {
    console.log('api call');
    let response = null;
    fetch(`${SERVER_URL}/stock-prices?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => { response = data });

    return response;
}