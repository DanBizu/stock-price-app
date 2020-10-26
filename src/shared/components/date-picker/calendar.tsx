import { MONTHS, WEEK_DAYS } from './calendar.const';
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
        <div.Calendar data-cy='calendar'>
            <div.CalendarMonthHeader>

                <div.CalendarMonthContent>
                    <div.CalendarMonthText data-cy='month'>
                        {`${Object.keys(MONTHS)[currentMonth.month]} `}
                    </div.CalendarMonthText>

                    <div.CalendarMonthText data-cy='year'>
                        {currentMonth.year}
                    </div.CalendarMonthText>

                </div.CalendarMonthContent>

                <div.CalendarHeaderIcons>
                    <Icon
                        onPress={() => changeToPrevMonth(prevMonth)}
                        icon='/calendar/chevron_left.png'
                        iconHovered='/calendar/chevron_left.png' />
                </div.CalendarHeaderIcons>

                <div.CalendarHeaderIcons>
                    <Icon
                        onPress={() => changeToNextMonth(currentMonth, nextMonth)}
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