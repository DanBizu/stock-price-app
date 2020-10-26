import { Calendar, CalendarProps } from './calendar';
import { MONTHS } from './calendar.const';
import * as div from './date-picker.style';
import { CalendarDay, CalendarMonth } from '../../interfaces/calendar';
import { Icon } from '../icon/icon';
import React from 'react';
import {
    fillFirstWeekCount,
    fillLastWeekCount,
    getCurrentMonthDates,
    getMonthDaysCount,
    getMonthFirstDay,
    getNextMonth,
    getNextMonthDates,
    getPreviousMonth,
    getPreviousMonthDates,
    initState,
} from './date-picker.utils';

interface Props { }

export interface DatePickerState {
    clicked: Boolean;
    date: CalendarDay;
    currentMonth: CalendarMonth;
    currentMonthDays: number;
    currentMonthFirstDay: number;
    currentMonthDates: CalendarDay[];
    prevMonth: CalendarMonth;
    daysFromPrevMonth: number;
    prevMonthDays: number;
    prevMonthDates: CalendarDay[];
    nextMonth: CalendarMonth;
    daysFromNextMonth: number;
    nextMonthDates: CalendarDay[];
    hasDateChanged: Boolean;
}

/**
 * DatePicker component to display calendar.
 * Select a specific date.
 * Initially has the current date selected.
 */
export class DatePicker extends React.Component<Props, DatePickerState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            ...initState(),
        };
    }

    public render() {
        const { clicked, date } = this.state;

        console.log(this.state);

        return (
            <div.DatePicker data-cy='date-picker'>

                <div.Date>
                    <div.Fill>
                        <div.HeaderContent> Datepicker </div.HeaderContent>
                    </div.Fill>

                    <div.Day>
                        <div.HeaderContent data-cy='day'> {date.day} </div.HeaderContent>
                    </div.Day>

                    <div.Month>
                        <div.HeaderContent data-cy='month'>
                            {Object.keys(MONTHS)[+(date.month)]}
                        </div.HeaderContent>
                    </div.Month>

                    <div.Year>
                        <div.HeaderContent data-cy='year'> {date.year} </div.HeaderContent>
                    </div.Year>

                    <div.Icon data-cy='open-calendar'>
                        <Icon
                            onPress={() => this.displayCalendar()}
                            icon='/datepicker/arrow_drop_down_black.png'
                            iconHovered='/datepicker/arrow_drop_down_black.png'
                        />
                    </div.Icon>

                </div.Date>

                {
                    clicked &&
                    <Calendar {...this.getCalendarProps()} />
                }
            </div.DatePicker>
        );
    }

    private displayCalendar() {
        this.setState(prevState => ({
            ...this.state,
            clicked: !prevState.clicked,
        }));
    }

    private changeSelectedDate(date: CalendarDay) {
        this.setState(prevState => ({
            ...this.state,
            date,
            clicked: !prevState.clicked,
        }));
    }

    private changeToPrevMonth(prevMonth: CalendarMonth) {
        const currentMonth: CalendarMonth = prevMonth;
        const currentMonthDays = getMonthDaysCount(prevMonth);
        const updatedPrevMonth = getPreviousMonth(currentMonth);
        const currentMonthFirstDay = getMonthFirstDay(currentMonth);
        const prevMonthDays = getMonthDaysCount(updatedPrevMonth);
        const daysFromPrevMonth = fillFirstWeekCount(currentMonthFirstDay);
        const daysFromNextMonth = fillLastWeekCount(daysFromPrevMonth, currentMonthDays);

        // Generate the dates from previous month to fill the 6 displayed weeks
        const prevMonthDates: CalendarDay[] = getPreviousMonthDates(daysFromPrevMonth, updatedPrevMonth);

        // Generate the dates from the current month
        const currentMonthDates = getCurrentMonthDates(currentMonth);

        // Generate the dates from next month to fill the 6 displayed weeks
        const nextMonth = getNextMonth(currentMonth);
        const nextMonthDates = getNextMonthDates(daysFromNextMonth, nextMonth);

        this.setState(prevState => ({
            ...this.state,
            currentMonth,
            currentMonthDays,
            currentMonthFirstDay,
            currentMonthDates,
            prevMonth: updatedPrevMonth,
            daysFromPrevMonth,
            prevMonthDays,
            prevMonthDates,
            nextMonth: { ...prevState.currentMonth },
            daysFromNextMonth,
            nextMonthDates,
        }));
    }

    private switchToNextMonth(currentMonth: CalendarMonth, nextMonth: CalendarMonth) {
        const updatedCurrentMonth = nextMonth;
        const currentMonthDays = getMonthDaysCount(nextMonth);
        const currentMonthFirstDay = getMonthFirstDay(updatedCurrentMonth);
        const prevMonthDays = getMonthDaysCount(currentMonth);
        const daysFromPrevMonth = fillFirstWeekCount(currentMonthFirstDay);
        const daysFromNextMonth = fillLastWeekCount(daysFromPrevMonth, currentMonthDays);

        // Generate the dates from previous month to fill the 6 displayed weeks
        const prevMonthDates: CalendarDay[] = getPreviousMonthDates(daysFromPrevMonth, currentMonth);

        // Generate the dates from the current month
        const currentMonthDates = getCurrentMonthDates(updatedCurrentMonth);

        // Generate the dates from next month to fill the 6 displayed weeks
        const updatedNextMonth = getNextMonth(updatedCurrentMonth);
        const nextMonthDates = getNextMonthDates(daysFromNextMonth, updatedNextMonth);

        this.setState(prevState => ({
            ...this.state,
            currentMonth: updatedCurrentMonth,
            currentMonthDays,
            currentMonthFirstDay,
            currentMonthDates,
            prevMonth: { ...prevState.currentMonth },
            daysFromPrevMonth,
            prevMonthDays,
            prevMonthDates,
            nextMonth: updatedNextMonth,
            daysFromNextMonth,
            nextMonthDates,
        }));
    }

    private getCalendarProps(): CalendarProps {
        const {
            date,
            currentMonth,
            prevMonth,
            prevMonthDates,
            currentMonthDates,
            nextMonthDates,
            nextMonth
        } = this.state;

        return {
            selectedDate: date,
            currentMonth,
            prevMonth,
            prevMonthDates,
            currentMonthDates,
            nextMonthDates,
            nextMonth,
            handleSelectedDate: (date: CalendarDay) => this.changeSelectedDate(date),
            changeToPrevMonth: (prevMonth: CalendarMonth) => this.changeToPrevMonth(prevMonth),
            changeToNextMonth: (currentMonth: CalendarMonth, nextMonth: CalendarMonth) => this.switchToNextMonth(currentMonth, nextMonth)
        }
    }
}