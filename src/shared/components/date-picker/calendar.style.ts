import styled from 'styled-components';

// export const Calendar = styled.div`
//     width: 300px;
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
// `;

// export const CalendarMonthHeader = styled.div`
//     display: flex;
//     flex-flow: row nowrap;
//     align-items: center;
// `;

// export const CalendarMonthContent = styled.div`
//     flex-direction: row;
//     flex-grow: 4;
//     justify-content: center;
// `;

// export const CalendarMonthText = styled.span`
//     text-align: center;
// `;

// export const CalendarHeaderIcons = styled.div`
//     flex-grow: 1;
// `;

export const WeekdaysHeader = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
`;

export const WeekdaysCell = styled.div`
    flex-basis: calc((100% — 2px) / 7);
    height: 44px;
    justify-content: center;
    align-items: center;
`;

export const DatesTable = styled.div`
    display: flex;
    flex-flow: row wrap;
    border-right-color: rgba(0, 0, 0, 0.1);
    border-right-style: solid;
    border-right-width: 0.5px;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-style: solid;
    border-bottom-width: 0.5px;
    border-left-color: rgba(0, 0, 0, 0.1);
    border-left-style: solid;
    border-left-width: 0.5px;
`;

export const InactiveCell = styled.div`
    border-top-color: rgba(0, 0, 0, 0.1);
    border-top-style: solid;
    border-top-width: 0.5px;
    border-left-color: rgba(0, 0, 0, 0.1);
    border-left-style: solid;
    border-left-width: 0.5px;
    flex-basis: calc((100% — 2px) / 7);
    height: 44px;
    justify-content: center;
    align-items: center;
`;

export const InactiveCellContent = styled.span`
    color: rgba(0, 0, 0, 0.1);
`;

export const ActiveCell = styled.button`
    border-top-color: rgba(0, 0, 0, 0.1);
    border-top-style: solid;
    border-top-width: 0.5px;
    border-left-color: rgba(0, 0, 0, 0.1);
    border-left-style: solid;
    border-left-width: 0.5px;
    flex-basis: calc((100% — 2px) / 7);
    height: 44px;
    justify-content: center;
    align-items: center;
`;

export const HighlightedCell = styled.div`
    border-color: rgba(0, 0, 0, 0.6);
    border-style: solid;
    border-width: 1px;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const ActiveCellContent = styled.span`
    color: rgba(0, 0, 0, 0.6);
    font-weight: 600;
`;