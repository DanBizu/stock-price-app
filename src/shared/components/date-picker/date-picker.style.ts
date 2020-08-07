import styled from 'styled-components';

export const DatePicker = styled.div`
    width: 300px;
    display: flex;
    flex-flow: column nowrap;
`;

export const Date = styled.div`
    width: 300px;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-evenly;
`;

export const Fill = styled.div`
    flex-grow: 5;
    justify-content: center;
`;

export const Day = styled.div`
    flex-grow: 1;
    justify-content: center;
`;

export const Month = styled.div`
    flex-grow: 2;
    justify-content: center;
`;

export const Year = styled.div`
    flex-grow: 1;
    justify-content: center;
`;

export const Icon = styled.div`
    flex-grow: 1;
    justify-content: center;
`;

export const HeaderContent = styled.span`
    text-align: center;
`;