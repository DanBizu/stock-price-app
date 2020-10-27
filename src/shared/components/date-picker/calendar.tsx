import { MONTHS, WEEK_DAYS } from './calendar.const';
import './calendar.css';
import * as div from './calendar.style';
import { CalendarDay, CalendarMonth } from '../../interfaces/calendar';
import { Icon } from '../icon/icon';
import * as React from 'react';

export interface CalendarProps {
    selectedDate: CalendarDay;
    handleSelectedDate: (date: CalendarDay) => void;
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
 * Calendar component to display calendar.
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
        handleSelectedDate,
        nextMonthDates,
    } = props;

    return (
        <div className='calendar'>
            <div className='header'>
                <div className='month'>
                    {`${Object.keys(MONTHS)[currentMonth.month]} ${currentMonth.year}`}
                </div>

                <div className='nav-month'>
                    <Icon icon='/calendar/chevron_left.png'
                        onPress={() => changeToPrevMonth(prevMonth)}
                        iconHovered='/calendar/chevron_left.png' />
                </div>

                <div className='nav-month'>
                    <Icon icon='/calendar/chevron_right.png'
                        onPress={() => changeToNextMonth(currentMonth, nextMonth)}
                        iconHovered='/calendar/chevron_right.png' />
                </div>
            </div>

            <div.WeekdaysHeader>
                {Object.keys(WEEK_DAYS).map((day, key) =>
                    <div.WeekdaysCell key={key}>
                        {WEEK_DAYS[day]}
                    </div.WeekdaysCell>
                )}
            </div.WeekdaysHeader>

            <div.DatesTable>
                {
                    !!prevMonthDates.length && prevMonthDates.map((date, key) =>
                        <div.InactiveCell key={key}>
                            <div.InactiveCellContent>
                                {date.day}
                            </div.InactiveCellContent>
                        </div.InactiveCell>
                    )
                }

                {
                    !!currentMonthDates.length && currentMonthDates.map((date, key) => {
                        if (date.day.valueOf() === selectedDate.day.valueOf() &&
                            date.month.valueOf() === selectedDate.month.valueOf()) {
                            return (
                                <div.InactiveCell key={key}>
                                    <div.HighlightedCell>
                                        <div.ActiveCellContent data-cy='selected-date'>
                                            {date.day}
                                        </div.ActiveCellContent>
                                    </div.HighlightedCell>
                                </div.InactiveCell>

                            );
                        } else {
                            return (
                                <div.ActiveCell id='active'
                                    key={key}
                                    onClick={() => handleSelectedDate(date)}>
                                    <div.ActiveCellContent>
                                        {date.day}
                                    </div.ActiveCellContent>
                                </div.ActiveCell>
                            );
                        }
                    })
                }

                {
                    !!nextMonthDates.length && nextMonthDates.map((date, key) =>
                        <div.InactiveCell key={key}>
                            <div.InactiveCellContent>
                                {date.day}
                            </div.InactiveCellContent>
                        </div.InactiveCell>
                    )
                }
            </div.DatesTable>
        </div>
    );
}