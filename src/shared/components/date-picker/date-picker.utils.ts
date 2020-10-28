import { DatePickerState } from './date-picker';
import { CalendarDay, CalendarMonth } from '../../interfaces/calendar';

export const DISPLAY_WEEKS = 6;

export function getNextMonth(currentMonth: CalendarMonth): CalendarMonth {
    const { month, year } = currentMonth;
    let nextMonth = {
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
    };
    return nextMonth;
}

export function getPreviousMonth(currentMonth: CalendarMonth): CalendarMonth {
    const { month, year } = currentMonth;

    let prevMonth = {
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
    };
    return prevMonth;
}

/**
 * What day of the weeks was this month's first day
 * <<!>> Keep in mind that Sunday is the first day of the week (index 0) <<!>>
 */
export function getMonthFirstDay(currentMonth: CalendarMonth) {
    const { year, month } = currentMonth;
    return new Date(`${year}-${padWithZero(month + 1)}-01`).getDay();
}

/** Get the number of the days for each month */
export function getMonthDaysCount(currentMonth: CalendarMonth) {
    const { month, year } = currentMonth;
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

/**
 * Calculate the number of days necessary to
 * fill the FIRST week with days from PREVIOUS month
 */
export function fillFirstWeekCount(currentMonthFirstDay: number) {
    return currentMonthFirstDay === 0 ? 0 : currentMonthFirstDay;
}

/**
 * Calculate the number of days necessary to fill
 * the LAST week with days from FOLLOWING month
 */
export function fillLastWeekCount(daysFromPrevMonth: number, currentMonthDays: number) {
    return (DISPLAY_WEEKS * 7) - (daysFromPrevMonth + currentMonthDays);
}

export function initState(): DatePickerState {
    const now = new Date();

    const currentMonth: CalendarMonth = {
        month: now.getMonth(),
        year: now.getFullYear(),
    };
    const currentMonthDays = getMonthDaysCount(currentMonth);
    const prevMonth = getPreviousMonth(currentMonth);
    const currentMonthFirstDay = getMonthFirstDay(currentMonth);
    const prevMonthDays = getMonthDaysCount(prevMonth);

    /**
     * Calculate the number of days necessary to fill the
     * first and last weeks with days from previous/next month
     */
    const daysFromPrevMonth = fillFirstWeekCount(currentMonthFirstDay);
    const daysFromNextMonth = fillLastWeekCount(daysFromPrevMonth, currentMonthDays);

    // Generate the dates from previous month to fill the 6 displayed weeks
    const prevMonthDates: CalendarDay[] = getPreviousMonthDates(daysFromPrevMonth, prevMonth);

    // Generate the dates from the current month
    const currentMonthDates = getCurrentMonthDates(currentMonth);

    // Generate the dates from next month to fill the 6 displayed weeks
    const nextMonth = getNextMonth(currentMonth);
    const nextMonthDates = getNextMonthDates(daysFromNextMonth, nextMonth);

    return {
        clicked: false,
        hasDateChanged: false,
        currentMonth,
        currentMonthDays,
        currentMonthFirstDay,
        currentMonthDates,
        prevMonth,
        daysFromPrevMonth,
        prevMonthDays,
        prevMonthDates,
        nextMonth: getNextMonth(currentMonth),
        daysFromNextMonth,
        nextMonthDates,
    };
}

/**
 * Generate the dates from previous month to fill the 6 displayed weeks
 * @param daysFromPrevMonth The number of days left to fill the first week of the month.
 * @param prevMonth Object containing the index of previous month and year.
 */
export function getPreviousMonthDates(daysFromPrevMonth: number, prevMonth: CalendarMonth): CalendarDay[] {
    const prevMonthDays = getMonthDaysCount(prevMonth);

    let prevMonthDates: CalendarDay[] = [];
    for (let index = 0; index < daysFromPrevMonth; index++) {
        let day = index + 1 + (prevMonthDays - daysFromPrevMonth);

        prevMonthDates.push({
            year: prevMonth.year,
            month: padWithZero(prevMonth.month),
            day: padWithZero(day),
        });
    }

    return prevMonthDates;
}

/**
 * Generates the dates for the current month.
 * @param currentMonth Object containing the index of the current month and the year.
 */
export function getCurrentMonthDates(currentMonth: CalendarMonth): CalendarDay[] {
    const dayCount = getMonthDaysCount(currentMonth);

    let currentMonthDates: CalendarDay[] = [];
    for (let index = 0; index < dayCount; index++) {
        currentMonthDates.push({
            year: currentMonth.year,
            month: padWithZero(currentMonth.month),
            day: padWithZero(index + 1),
        });
    }

    return currentMonthDates;
}

/**
 * Generate the dates from the following month to fill the last week on the calendar
 * @param daysFromNextMonth The number of days left to fill the last week of the month.
 * @param nextMonth Object containing the index of following month and year.
 */
export function getNextMonthDates(daysFromNextMonth: number, nextMonth: CalendarMonth): CalendarDay[] {
    let nextMonthDates: CalendarDay[] = [];
    for (let index = 0; index < daysFromNextMonth; index++) {
        nextMonthDates.push({
            year: nextMonth.year,
            month: padWithZero(nextMonth.month),
            day: padWithZero(index + 1),
        });
    }
    return nextMonthDates;
}