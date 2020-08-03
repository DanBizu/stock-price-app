import './graph.css';
import { GraphStockValues } from '../homepage/interfaces/homepage';
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface Props {
    data: GraphStockValues[];
    min: number;
    max: number;
}
interface State {
    width: number;
}

/**
 * Graph specifically made to show stock prices.
 * It handles the responsive aspect of the graph.
 */
export class Graph extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            width: 520,
        };
    }

    public render() {
        const { data, min, max } = this.props;
        const { width } = this.state;

        return (
            <div id="graph">
                <LineChart
                    width={width - 20}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[min, max]} allowDecimals={true} />
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

    public componentDidMount() {
        window.addEventListener('resize', this.updateSize.bind(this));

        this.updateSize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize.bind(this));
    }

    private updateSize() {
        /** Get the page width */
        let width = document.querySelector('html')?.offsetWidth;

        /** Validate width and keep it at a minimum of 520 so the graph doesn't shrink too much */
        width = width ? width : 0;
        if (width <= 520) {
            width = 520;
        }

        this.setState({
            width,
        })
    }
}
