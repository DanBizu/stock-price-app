import { DatePickerState } from './date-picker';
import { CalendarDay } from '../../interfaces/calendar';

export function getNextMonth(month: number, year: number) {
    let nextMonth = {
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
    };
    return nextMonth;
}

export function getPreviousMonth(month: number, year: number) {
    let prevMonth = {
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
    };
    return prevMonth;
}

export function getMonthFirstDay(month: number, year: number) {
    return new Date(`${year}-${padWithZero(month + 1)}-01`).getDay();
}

export function getMonthDays(month: number, year: number) {
    const months30 = [3, 5, 8, 10];
    const leapYear = (year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0));

    return month === 1 ?
        leapYear ? 29 : 28
        :
        months30.includes(month) ? 30 : 31;
}

export function padWithZero(value: number) {
    if (value < 10) {
        return '0' + value.toString();
    } else {
        return value.toString();
    }
}


export function initState(): DatePickerState {
    const today = new Date();
    const date = {
        day: padWithZero(today.getDate()),
        month: padWithZero(today.getMonth()),
        year: today.getFullYear(),
    };
    const displayedWeeks = 6;
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentMonthDays = getMonthDays(currentMonth, currentYear);
    const prevMonth = getPreviousMonth(currentMonth, currentYear);
    const currentMonthFirstDay = getMonthFirstDay(currentMonth, currentYear);
    const prevMonthDays = getMonthDays(prevMonth.month, prevMonth.year);
    const daysFromPrevMonth = currentMonthFirstDay === 0 ? 6 : currentMonthFirstDay - 1;
    const daysFromNextMonth = (displayedWeeks * 7) - (daysFromPrevMonth + currentMonthDays);

    let prevMonthDates = new Array<CalendarDay>();
    for (let index = 0; index < daysFromPrevMonth; index++) {
        let day = index + 1 + (prevMonthDays - daysFromPrevMonth);

        prevMonthDates.push({
            year: prevMonth.year,
            month: padWithZero(prevMonth.month),
            day: padWithZero(day),
        } as CalendarDay);
    }

    let currentMonthDates = new Array<CalendarDay>();
    for (let index = 0; index < currentMonthDays; index++) {
        currentMonthDates.push({
            year: currentYear,
            month: padWithZero(currentMonth),
            day: padWithZero(index + 1),
        });
    }

    let nextMonthDates = new Array<CalendarDay>();
    for (let index = 0; index < daysFromNextMonth; index++) {
        nextMonthDates.push({
            year: getNextMonth(currentMonth, currentYear).year,
            month: padWithZero(getNextMonth(currentMonth, currentYear).month),
            day: padWithZero(index + 1),
        });
    }

    return {
        clicked: false,
        hasDateChanged: false,
        date,
        displayedWeeks,
        currentMonth,
        currentYear,
        currentMonthDays,
        currentMonthFirstDay,
        currentMonthDates,
        prevMonth,
        daysFromPrevMonth,
        prevMonthDays,
        prevMonthDates,
        nextMonth: getNextMonth(currentMonth, currentYear),
        daysFromNextMonth,
        nextMonthDates,
    };
}