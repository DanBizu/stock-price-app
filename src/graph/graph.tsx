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

export const Graph = (props: Props) => {
    const { data, min, max } = props;
    return (
        <LineChart
            width={500}
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
    );
}