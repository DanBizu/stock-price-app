import { apiCall } from './services/webapi';
import React from 'react';

interface Props {}

export const Homepage = (props: Props) => {
    let [data, setData] = React.useState(null);

    React.useEffect(() => {
        let response = apiCall('NKE');
        setData(response);
    });

    console.log('+++ data', data);
    return (
        <div>
            <h1> Homepage </h1>
        </div>
    );
}