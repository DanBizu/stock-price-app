import { Calendar } from './calendar';
import { MONTHS } from './calendar.const';
import * as div from './date-picker.style';
import {
    getMonthDays,
    getMonthFirstDay,
    getNextMonth,
    getPreviousMonth,
    initState,
    padWithZero
    } from './date-picker.utils';
import { CalendarDay, Month } from '../../interfaces/calendar';
import { Icon } from '../icon/icon';
import React from 'react';

interface Props { }

interface State {
    clicked: Boolean;
    date: CalendarDay;
    displayedWeeks: number;
    currentMonth: number;
    currentYear: number;
    currentMonthDays: number;
    currentMonthFirstDay: number;
    currentMonthDates: CalendarDay[];
    prevMonth: Month;
    daysFromPrevMonth: number;
    prevMonthDays: number;
    prevMonthDates: CalendarDay[];
    nextMonth: Month;
    daysFromNextMonth: number;
    nextMonthDates: CalendarDay[];
    hasDateChanged: Boolean;
}

/**
 * Datepicker component to display calendar.
 * Select a specific date.
 * Initially has the current date selected.
 */
export class DatePicker extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            ...initState(),
            clicked: false,
            // date: {} as CalendarDay,
            // displayedWeeks: -1,
            // currentMonth: -1,
            // currentYear: -1,
            // currentMonthDays: -1,
            // currentMonthFirstDay: -1,
            // currentMonthDates: [],
            // prevMonth: {} as Month,
            // daysFromPrevMonth: -1,
            // prevMonthDays: -1,
            // prevMonthDates: [],
            // nextMonth: {} as Month,
            // daysFromNextMonth: -1,
            // nextMonthDates: [],
            hasDateChanged: false,
        };
    }

    public render() {
        let { clicked, date, currentMonth, currentYear, prevMonth, displayedWeeks,
            prevMonthDates, currentMonthDates, nextMonthDates,
            nextMonth } = this.state;

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
                    <Calendar testID='calendar'
                        selectedDate={date}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        prevMonth={prevMonth}
                        displayedWeeks={displayedWeeks}
                        prevMonthDates={prevMonthDates}
                        currentMonthDates={currentMonthDates}
                        nextMonthDates={nextMonthDates}
                        nextMonth={nextMonth}
                        handleSelectedDate={(date: CalendarDay) => this.changeSelectedDate(date)}
                        changeToPrevMonth={(prevMonth: Month, displayedWeeks: number) =>
                            this.changeToPrevMonth(prevMonth, displayedWeeks)
                        }
                        changeToNextMonth={(currentMonth: number, currentYear: number,
                            nextMonth: Month, displayedWeeks: number) =>
                            this.changeToNextMonth(currentMonth, currentYear, nextMonth, displayedWeeks)
                        }
                    />
                }
            </div.DatePicker>
        );
    }

    // public componentDidMount() {
    //     let state = this.initState();

    //     this.setState({
    //         ...state,
    //     });
    // }

    // private initState() {
    //     const today = new Date();
    //     const date = {
    //         day: padWithZero(today.getDate()),
    //         month: padWithZero(today.getMonth()),
    //         year: today.getFullYear(),
    //     };
    //     const displayedWeeks = 6;
    //     const currentMonth = today.getMonth();
    //     const currentYear = today.getFullYear();
    //     const currentMonthDays = getMonthDays(currentMonth, currentYear);
    //     const prevMonth = getPreviousMonth(currentMonth, currentYear);
    //     const currentMonthFirstDay = getMonthFirstDay(currentMonth, currentYear);
    //     const prevMonthDays = getMonthDays(prevMonth.month, prevMonth.year);
    //     const daysFromPrevMonth = currentMonthFirstDay === 0 ? 6 : currentMonthFirstDay - 1;
    //     const daysFromNextMonth = (displayedWeeks * 7) - (daysFromPrevMonth + currentMonthDays);

    //     let prevMonthDates = new Array<CalendarDay>();
    //     for (let index = 0; index < daysFromPrevMonth; index++) {
    //         let day = index + 1 + (prevMonthDays - daysFromPrevMonth);

    //         prevMonthDates.push({
    //             year: prevMonth.year,
    //             month: padWithZero(prevMonth.month),
    //             day: padWithZero(day),
    //         } as CalendarDay);
    //     }

    //     let currentMonthDates = new Array<CalendarDay>();
    //     for (let index = 0; index < currentMonthDays; index++) {
    //         currentMonthDates.push({
    //             year: currentYear,
    //             month: padWithZero(currentMonth),
    //             day: padWithZero(index + 1),
    //         });
    //     }

    //     let nextMonthDates = new Array<CalendarDay>();
    //     for (let index = 0; index < daysFromNextMonth; index++) {
    //         nextMonthDates.push({
    //             year: getNextMonth(currentMonth, currentYear).year,
    //             month: padWithZero(getNextMonth(currentMonth, currentYear).month),
    //             day: padWithZero(index + 1),
    //         });
    //     }

    //     return {
    //         date,
    //         displayedWeeks,
    //         currentMonth,
    //         currentYear,
    //         currentMonthDays,
    //         currentMonthFirstDay,
    //         currentMonthDates,
    //         prevMonth,
    //         daysFromPrevMonth,
    //         prevMonthDays,
    //         prevMonthDates,
    //         nextMonth: getNextMonth(currentMonth, currentYear),
    //         daysFromNextMonth,
    //         nextMonthDates,
    //     };
    // }

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

    private changeToPrevMonth(prevMonth: Month, displayedWeeks: number) {

        const currentMonth = prevMonth.month;
        const currentYear = prevMonth.year;
        const currentMonthDays = getMonthDays(currentMonth, currentYear);
        const changedPrevMonth = getPreviousMonth(currentMonth, currentYear);
        const currentMonthFirstDay = getMonthFirstDay(currentMonth, currentYear);
        const prevMonthDays = getMonthDays(changedPrevMonth.month, changedPrevMonth.year);
        const daysFromPrevMonth = currentMonthFirstDay === 0 ? 6 : currentMonthFirstDay - 1;
        const daysFromNextMonth = (displayedWeeks * 7) - (daysFromPrevMonth + currentMonthDays);

        // Generate the dates from previous month to fill the 6 displayed weeks
        let prevMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < daysFromPrevMonth; index++) {
            let day = index + 1 + (prevMonthDays - daysFromPrevMonth);

            prevMonthDates.push({
                year: prevMonth.year,
                month: padWithZero(prevMonth.month),
                day: padWithZero(day),
            } as CalendarDay);
        }

        // Generate the dates from the current month
        let currentMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < currentMonthDays; index++) {
            currentMonthDates.push({
                year: currentYear,
                month: padWithZero(currentMonth),
                day: padWithZero(index + 1),
            });
        }

        // Generate the dates from next month to fill the 6 displayed weeks
        let nextMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < daysFromNextMonth; index++) {
            nextMonthDates.push({
                year: getNextMonth(currentMonth, currentYear).year,
                month: padWithZero(getNextMonth(currentMonth, currentYear).month),
                day: padWithZero(index + 1),
            });
        }

        this.setState(prevState => ({
            ...this.state,
            currentMonth,
            currentYear,
            currentMonthDays,
            currentMonthFirstDay,
            currentMonthDates,
            prevMonth: changedPrevMonth,
            daysFromPrevMonth,
            prevMonthDays,
            prevMonthDates,
            nextMonth: {
                month: prevState.currentMonth,
                year: prevState.currentYear,
            },
            daysFromNextMonth,
            nextMonthDates,
        }));
    }

    private changeToNextMonth(currentMonth: number, currentYear: number, nextMonth: Month, displayedWeeks: number) {

        const changedCurrentMonth = nextMonth.month;
        const changedCurrentYear = nextMonth.year;
        const currentMonthDays = getMonthDays(changedCurrentMonth, changedCurrentYear);
        const currentMonthFirstDay = getMonthFirstDay(changedCurrentMonth, changedCurrentYear);
        const prevMonthDays = getMonthDays(currentMonth, currentYear);
        const daysFromPrevMonth = currentMonthFirstDay === 0 ? 6 : currentMonthFirstDay - 1;
        const daysFromNextMonth = (displayedWeeks * 7) - (daysFromPrevMonth + currentMonthDays);

        // Generate the dates from previous month to fill the 6 displayed weeks
        let prevMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < daysFromPrevMonth; index++) {
            let day = index + 1 + (prevMonthDays - daysFromPrevMonth);

            prevMonthDates.push({
                year: currentYear,
                month: padWithZero(currentMonth),
                day: padWithZero(day),
            } as CalendarDay);
        }

        // Generate the dates from the current month
        let currentMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < currentMonthDays; index++) {
            currentMonthDates.push({
                year: changedCurrentYear,
                month: padWithZero(changedCurrentMonth),
                day: padWithZero(index + 1),
            });
        }

        // Generate the dates from next month to fill the 6 displayed weeks
        let nextMonthDates = new Array<CalendarDay>();
        for (let index = 0; index < daysFromNextMonth; index++) {
            nextMonthDates.push({
                year: getNextMonth(changedCurrentMonth, changedCurrentYear).year,
                month: padWithZero(getNextMonth(changedCurrentMonth, changedCurrentYear).month),
                day: padWithZero(index + 1),
            });
        }

        this.setState(prevState => ({
            ...this.state,
            currentMonth: changedCurrentMonth,
            currentYear: changedCurrentYear,
            currentMonthDays,
            currentMonthFirstDay,
            currentMonthDates,
            prevMonth: {
                month: prevState.currentMonth,
                year: prevState.currentYear,
            },
            daysFromPrevMonth,
            prevMonthDays,
            prevMonthDates,
            nextMonth: getNextMonth(changedCurrentMonth, changedCurrentYear),
            daysFromNextMonth,
            nextMonthDates,
        }));
    }
}