export interface Stock {
    "Meta Data": StockMetaData,
    "Time Series (Daily)": StockData,
}

export interface StockMetaData {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Output Size": string,
    "5. Time Zone": string,
}

export interface StockData {
    [key: string]: StockValues,
}

export interface StockValues {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
}

export interface GraphStockValues {
    date: string,
    open: string,
    high: string,
    low: string,
    close: string,
}

export interface Limits {
    min: number,
    max: number,
}