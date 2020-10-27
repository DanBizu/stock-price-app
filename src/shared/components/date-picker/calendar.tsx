import { MONTHS, WEEK_DAYS } from './calendar.const';
import './calendar.css';
import { CalendarDay, CalendarMonth } from '../../interfaces/calendar';
import { Icon } from '../icon/icon';
import * as React from 'react';

export interface CalendarProps {
    selectedDate: CalendarDay;
    selectDate: (date: CalendarDay) => void;
    currentMonth: CalendarMonth;
    currentMonthDates: CalendarDay[];
    prevMonth: CalendarMonth;
    prevMonthDates: CalendarDay[];
    nextMonth: CalendarMonth;
    nextMonthDates: CalendarDay[];
    changeToPrevMonth: (prevMonth: CalendarMonth) => void;
    changeToNextMonth: (currentMonth: CalendarMonth, nextMonth: CalendarMonth) => void;
}

/**
 * The table with the dates. Handles selection for other date.
 */
export const Calendar: React.FunctionComponent<CalendarProps> = (props: CalendarProps) => {
    const {
        currentMonth,
        prevMonth,
        changeToNextMonth,
        changeToPrevMonth,
        nextMonth,
        prevMonthDates,
        currentMonthDates,
        selectedDate,
        selectDate,
        nextMonthDates,
    } = props;

    return (
        <div className='calendar'>
            {/** Header */}
            <div className='header'>
                <div className='month'>
                    {`${Object.keys(MONTHS)[currentMonth.month]} ${currentMonth.year}`}
                </div>

                {/** Switch to previous month */}
                <div className='nav-month'>
                    <Icon icon='/calendar/chevron_left.png'
                        onPress={() => changeToPrevMonth(prevMonth)}
                        iconHovered='/calendar/chevron_left.png' />
                </div>

                {/** Switch to next month */}
                <div className='nav-month'>
                    <Icon icon='/calendar/chevron_right.png'
                        onPress={() => changeToNextMonth(currentMonth, nextMonth)}
                        iconHovered='/calendar/chevron_right.png' />
                </div>
            </div>

            {/** Weekdays */}
            <div className='weekdays'>
                {
                    Object.keys(WEEK_DAYS).map((day, key) =>
                        <div key={key} className='weekday-cell'>
                            {WEEK_DAYS[day]}
                        </div>
                    )
                }
            </div>

            <div className='table'>
                {/** Fill first week with days from previous month */}
                {
                    !!prevMonthDates.length && prevMonthDates.map((date, key) =>
                        <div key={key} className='cell inactive'>
                            {date.day}
                        </div>
                    )
                }

                {/** Current month dates */}
                {
                    !!currentMonthDates.length && currentMonthDates.map((date, key) =>
                        showDates(date, key, selectedDate, (date) => selectDate(date))
                    )
                }

                {/** Fill last week with days from following month */}
                {
                    !!nextMonthDates.length && nextMonthDates.map((date, key) =>
                        <div key={key} className='cell inactive'>
                            {date.day}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

function showDates(date: CalendarDay, key: number, selectedDate: CalendarDay, selectDate: (date: CalendarDay) => void): JSX.Element {
    if (date.day === selectedDate.day && date.month === selectedDate.month) {
        return (
            <div key={key} className='cell' id='selected-cell'>
                {date.day}
            </div>
        );
    } else {
        return (
            <div key={key}
                className='cell'
                onClick={() => selectDate(date)}>
                {date.day}
            </div>
        );
    }
}