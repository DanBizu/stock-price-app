import { Stock } from './interfaces/homepage';
import { apiCall, initStockData } from './services/homepage.services';
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface Props { }
interface State {
    data: Stock;
    symbol: string;
}

const Xdata = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

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
                    data={Xdata}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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

    /**
     * Manage data
     * Turn Time Series (<Daily/Weekly/Monthly>) into
     * array so it can be used in the chart component
     */
    private prepareData() {
        const { data } = this.state;

        let timeSeries = Object.keys(data["Time Series (Daily)"])
    }
}
