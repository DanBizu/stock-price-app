import { Stock } from './interfaces/homepage';
import { apiCall, initStockData, prepareData } from './services/homepage.services';
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface Props { }
interface State {
    data: Stock;
    symbol: string;
}

export class Homepage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: initStockData(),
            symbol: '',
        }
    }

    public render() {
        const { data, symbol } = this.state;
        console.log('+++ data', data);
        console.log('+++ symbol', symbol);

        prepareData(data);
        return (
            <div>
                <h1> Homepage </h1>
                <label>
                    Symbol
                    <input type="text" name="symbol" onChange={(e) => this.handleChange(e)} />
                </label>

                <p>A good place to find stock symbols is <a href="http://eoddata.com/stocklist/NYSE/A.htm" target="blank">here</a></p>

                <button onClick={() => this.getStockPrices()}>Get prices</button>

                <LineChart
                    width={500}
                    height={300}
                    data={prepareData(data)}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[90, 110]} allowDecimals={true} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="high" stroke="#d89284" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="low" stroke="#d8d584" activeDot={{ r: 8 }} />

                    <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                </LineChart>
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
            });
        });
    }
}
