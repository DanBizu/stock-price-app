import { SERVER_URL } from '../../shared/server-cfg';
import { Stock } from '../interfaces/homepage';

export async function apiCall(symbol: string) {
    let response = await fetch(`${SERVER_URL}/stock-prices?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
    return response;
}

export function initStockData(): Stock {
    return {
        "Meta Data": {
            Information: '',
            Symbol: '',
            "Last Refreshed": '',
            "Output Size": '',
            "Time Zone": '',
        },
        "Time Series (Daily)": {}
    }
}