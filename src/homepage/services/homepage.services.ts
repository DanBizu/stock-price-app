import { SERVER_URL } from '../../shared/server-cfg';
import { GraphStockValues, Stock } from '../interfaces/homepage';

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
            "1. Information": '',
            "2. Symbol": '',
            "3. Last Refreshed": '',
            "4. Output Size": '',
            "5. Time Zone": '',
        },
        "Time Series (Daily)": {}
    }
}

/**
 * Manage data
 * Turn Time Series (<Daily/Weekly/Monthly>) into
 * array so it can be used in the chart component
 */
export function prepareData(data: Stock): GraphStockValues[] {
    let timeSeries = Object.keys(data["Time Series (Daily)"])
    console.log('+++ timeSeries', timeSeries);

    let result = timeSeries.map(date => {
        return {
            date: date,
            open: data["Time Series (Daily)"][date]["1. open"],
            high: data["Time Series (Daily)"][date]["2. high"],
            low: data["Time Series (Daily)"][date]["3. low"],
            close: data["Time Series (Daily)"][date]["4. close"],
        }
    })

    /** Reverse because dates start from most recent to oldest */
    return result.reverse();
}