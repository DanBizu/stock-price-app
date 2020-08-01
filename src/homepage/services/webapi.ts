import { SERVER_URL } from '../../shared/server-cfg';

export async function apiCall(symbol: string) {
    let response = await fetch(`${SERVER_URL}/stock-prices?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
    return response;
}