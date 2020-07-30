import { apiCall } from './services/webapi';
import React from 'react';

interface Props {}

export const Homepage = (props: Props) => {
    // const {} = props;

    React.useEffect(() => {
        apiCall();
    });
    return (
        <div>
            <h1> Homepage </h1>
        </div>
    );
}