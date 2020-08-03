export interface DailyStock {
    "Meta Data": StockMetaData,
    "Time Series (Daily)": StockData,
    [key: string]: StockMetaData | StockData,
}

export interface WeeklyStock {
    "Meta Data": StockMetaData,
    "Weekly Time Series": StockData,
    [key: string]: StockMetaData | StockData,
}

export interface MonthlyStock {
    "Meta Data": StockMetaData,
    "Monthly Time Series": StockData,
    [key: string]: StockMetaData | StockData,
}

export type Stock = DailyStock | WeeklyStock | MonthlyStock;

export interface StockMetaData {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Output Size"?: string,
    "4. Time Zone"?: string,
    "5. Time Zone"?: string,
}

export interface StockData {
    [key: string]: StockValues,
}

export interface StockValues {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string,
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

export enum TIME_SERIES {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
}