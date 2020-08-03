import { SERVER_URL } from '../../shared/server-cfg';
import { GraphStockValues, Limits, Stock } from '../interfaces/homepage';

// ====== API ======

export async function apiCall(symbol: string) {
    let response = await fetch(`${SERVER_URL}/stock-prices?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
    return response;
}

// ====== UTILS ======

/** Initialize with empty values */
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

/**
 * Get min and max out of all values (open, high, low, close)
 */
export function getLimits(data: GraphStockValues[]): Limits {
    let min = +data[0].high;
    let max = +data[0].low;

    data.forEach(stockValue => {
        if (+stockValue.close < min) {
            min = Math.floor(+stockValue.close);
        } else if (+stockValue.close > max) {
            max = Math.ceil(+stockValue.close);
        }

        if (+stockValue.high < min) {
            min = Math.floor(+stockValue.high);
        } else if (+stockValue.high > max) {
            max = Math.ceil(+stockValue.high);
        }

        if (+stockValue.low < min) {
            min = Math.floor(+stockValue.low);
        } else if (+stockValue.low > max) {
            max = Math.ceil(+stockValue.low);
        }

        if (+stockValue.open < min) {
            min = Math.floor(+stockValue.open);
        } else if (+stockValue.open > max) {
            max = Math.ceil(+stockValue.open);
        }
    });

    return {
        min,
        max,
    };
}