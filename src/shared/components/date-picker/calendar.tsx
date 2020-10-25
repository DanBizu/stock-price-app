import { MONTHS, WEEK_DAYS } from './calendar.const';
import * as div from './calendar.style';
import { CalendarDay, CalendarMonth } from '../../interfaces/calendar';
import { Icon } from '../icon/icon';
import * as React from 'react';

export interface CalendarProps {
    selectedDate: CalendarDay;
    handleSelectedDate: (date: CalendarDay) => void;
    displayedWeeks: number;
    currentMonth: number;
    currentYear: number;
    currentMonthDates: CalendarDay[];
    prevMonth: CalendarMonth;
    prevMonthDates: CalendarDay[];
    nextMonth: CalendarMonth;
    nextMonthDates: CalendarDay[];
    changeToPrevMonth: (prevMonth: CalendarMonth, displayedWeeks: number) => void;
    changeToNextMonth: (currentMonth: number, currentYear: number,
        nextMonth: CalendarMonth, displayedWeeks: number) => void;
}

/**
 * Calendar component to display calendar.
 */
export const Calendar: React.FunctionComponent<CalendarProps> = (props: CalendarProps) => {
    const {
        currentYear,
        currentMonth,
        prevMonth,
        displayedWeeks,
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
        <div.Calendar data-cy='calendar'>
            <div.CalendarMonthHeader>

                <div.CalendarMonthContent>
                    <div.CalendarMonthText data-cy='month'>
                        {`${Object.keys(MONTHS)[currentMonth]} `}
                    </div.CalendarMonthText>

                    <div.CalendarMonthText data-cy='year'>
                        {currentYear}
                    </div.CalendarMonthText>

                </div.CalendarMonthContent>

                <div.CalendarHeaderIcons>
                    <Icon
                        onPress={() => changeToPrevMonth(prevMonth, displayedWeeks)}
                        icon='/calendar/chevron_left.png'
                        iconHovered='/calendar/chevron_left.png' />
                </div.CalendarHeaderIcons>

                <div.CalendarHeaderIcons>
                    <Icon
                        onPress={() => changeToNextMonth(currentMonth, currentYear, nextMonth, displayedWeeks)}
                        icon='/calendar/chevron_right.png'
                        iconHovered='/calendar/chevron_right.png' />
                </div.CalendarHeaderIcons>

            </div.CalendarMonthHeader>

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
        </div.Calendar>
    );
}