import { apiCall } from './services/webapi';
import React from 'react';

interface Props { }
interface State {
    data: any;
    symbol: string;
}

export class Homepage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: null,
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

                <button onClick={() => this.getStockPrices()}>Get prices</button>
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

// interface Stock {
//     "Meta Data": StockMetaData,
//     "Time Series (Daily)": any,
// }

// interface StockMetaData {
//     Information: string,
//     Symbol: string,
//     "Last Refreshed": string,
//     "Output Size": string,
//     "Time Zone": string,
// }