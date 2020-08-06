import {
    DailyStock,
    GraphStockValues,
    MonthlyStock,
    Stock,
    TIME_SERIES,
    WeeklyStock
    } from './interfaces/homepage';
import {
    apiCall,
    getDailyStockValues,
    getDisabledStatus,
    getLimits,
    getMonthlyStockValues,
    getWeeklyStockValues,
    initDailyStock,
    initMonthlyStock,
    initWeeklyStock
    } from './services/homepage.services';
import { Graph } from '../graph/graph';
import React from 'react';

interface Props { }
interface State {
    dailyStock: DailyStock;
    weeklyStock: WeeklyStock;
    monthlyStock: MonthlyStock;
    receivedData: boolean;
    symbol: string;
    timeSeries: TIME_SERIES;
    /**
     * It is necessary to keep the time series for which we received data
     * so that the other functions don't break when the time series changes.
     */
    receivedTimeSeries: TIME_SERIES;
    error: string;
}

export class Homepage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dailyStock: initDailyStock(),
            weeklyStock: initWeeklyStock(),
            monthlyStock: initMonthlyStock(),
            receivedData: false,
            symbol: '',
            timeSeries: TIME_SERIES.DAILY,
            receivedTimeSeries: TIME_SERIES.DAILY,
            error: '',
        }
    }

    public render() {
        const { receivedData, symbol } = this.state;

        return (
            <div id="homepage">
                <h1> Homepage </h1>
                <label>
                    Symbol
                    <input type="text" name="symbol" onChange={(e) => this.handleChange(e)} />
                </label>

                <label>
                    Time Series
                    <select name="timeSeries" onChange={(e) => this.handleSelect(e)}>
                        <option value={TIME_SERIES.DAILY}>{TIME_SERIES.DAILY}</option>
                        <option value={TIME_SERIES.WEEKLY}>{TIME_SERIES.WEEKLY}</option>
                        <option value={TIME_SERIES.MONTHLY}>{TIME_SERIES.MONTHLY}</option>
                    </select>
                </label>

                <p>A good place to find stock symbols is <a href="http://eoddata.com/stocklist/NYSE/A.htm" target="blank">here</a></p>

                <button disabled={getDisabledStatus(symbol)}
                    onClick={() => this.getStockPrices()}>
                    Get prices
                </button>

                {
                    receivedData &&
                    <Graph data={this.getStockValues()}
                        min={getLimits(this.getStockValues()).min}
                        max={getLimits(this.getStockValues()).max} />
                }
            </div>
        );
    }

    /** Input change */
    private handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    /** Select change */
    private handleSelect(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    /** Get data */
    private getStockPrices() {
        const { symbol, timeSeries } = this.state;

        apiCall(symbol, timeSeries).then(data => this.assignByTimeSeries(data));
    }

    /** Assign data to the correct state property based on timeSeries */
    private assignByTimeSeries(data: Stock) {
        const { timeSeries } = this.state;

        switch (timeSeries) {
            // ====== DAILY ======
            case TIME_SERIES.DAILY: {
                this.setState({
                    ...this.state,
                    dailyStock: data as DailyStock,
                    receivedTimeSeries: timeSeries,
                    receivedData: true,
                });
                break;
            }
            // ====== WEEKLY ======
            case TIME_SERIES.WEEKLY: {
                this.setState({
                    ...this.state,
                    weeklyStock: data as WeeklyStock,
                    receivedTimeSeries: timeSeries,
                    receivedData: true,
                });
                break;
            }
            // ====== MONTHLY ======
            case TIME_SERIES.MONTHLY: {
                this.setState({
                    ...this.state,
                    monthlyStock: data as MonthlyStock,
                    receivedTimeSeries: timeSeries,
                    receivedData: true,
                });
                break;
            }
            default: this.setState({
                ...this.state,
                error: 'We were unable to fetch data.',
                receivedData: false,
            });
        }
    }

    /** Call the functions according to desired timeSeries */
    private getStockValues(): GraphStockValues[] {
        const { receivedTimeSeries, dailyStock, weeklyStock, monthlyStock } = this.state;

        switch (receivedTimeSeries) {
            case TIME_SERIES.DAILY: return getDailyStockValues(dailyStock);
            case TIME_SERIES.WEEKLY: return getWeeklyStockValues(weeklyStock);
            case TIME_SERIES.MONTHLY: return getMonthlyStockValues(monthlyStock);
            default: return [];
        }
    }
}
