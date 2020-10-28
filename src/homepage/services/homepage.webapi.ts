import { SERVER_URL } from '../../shared/server-cfg';
import { Stock, TIME_SERIES } from '../interfaces/homepage';

// ====== API ======

export async function apiCall(symbol: string, timeSeries: TIME_SERIES): Promise<Stock> {
    let response = await fetch(`${SERVER_URL}/stock-prices?symbol=${symbol}&timeSeries=${timeSeries}`)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
    return response;
}