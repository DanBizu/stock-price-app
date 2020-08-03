import { Stock } from './interfaces/homepage';
import {
    apiCall,
    getLimits,
    initStockData,
    prepareData
    } from './services/homepage.services';
import { Graph } from '../graph/graph';
import React from 'react';

interface Props { }
interface State {
    data: Stock;
    receivedData: boolean;
    symbol: string;
}

export class Homepage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: initStockData(),
            receivedData: false,
            symbol: '',
        }
    }

    public render() {
        const { data, receivedData } = this.state;

        return (
            <div>
                <h1> Homepage </h1>
                <label>
                    Symbol
                    <input type="text" name="symbol" onChange={(e) => this.handleChange(e)} />
                </label>

                <p>A good place to find stock symbols is <a href="http://eoddata.com/stocklist/NYSE/A.htm" target="blank">here</a></p>

                <button onClick={() => this.getStockPrices()}>Get prices</button>

                {
                    receivedData &&
                    <Graph data={prepareData(data)}
                        min={getLimits(prepareData(data)).min}
                        max={getLimits(prepareData(data)).max} />
                }
            </div>
        );
    }

    private handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    private getStockPrices() {
        const { symbol } = this.state;

        apiCall(symbol).then(data => {
            this.setState({
                ...this.state,
                data,
                receivedData: true,
            });
        });
    }
}
