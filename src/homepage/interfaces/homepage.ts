export interface Stock {
    "Meta Data": StockMetaData,
    "Time Series (Daily)": StockData,
}

export interface StockMetaData {
    Information: string,
    Symbol: string,
    "Last Refreshed": string,
    "Output Size": string,
    "Time Zone": string,
}

export interface StockData {
    [key: string]: StockValues,
}

export interface StockValues {
    open: string,
    high: string,
    low: string,
    close: string,
}