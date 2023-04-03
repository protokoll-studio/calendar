
var currentMonth = '';
var currentYear = '';
/**
 * Generate the calendar
 * @param {} month 
 * @param {*} year 
 */
function generateCalendar(month, year) {
    currentMonth = month;
    currentYear = year;
    var dayName = '';
    var dayStart = 0;

    // Reset by default
    $('#calendar .calendar-view').empty(); // Clear the calendar before generate one
    $('#calendar .calendar-info').empty(); // Clear the info
    $('#calendar .calendar-info').append('<div class="calendar-info__month">' + getMonthName(currentMonth, currentYear) + ' ' + currentYear + '</div>');

    var checkStartChecked = false;

    for (var day = 1; day <= 42; day++) {
        // First line need to show the dayname
        dayName = '';
        if (day <= 7) {
            dayName = '<div class="calendar-day__name">' + getDayName(day) + '</div>';
        }

        // Check if the day is a weekend
        var classWeekend = '';
        if (isWeekend(day)) {
            classWeekend = 'calendar-day--weekend';
        }

        // Check when the month start
        if (checkStartMonth(1, currentMonth, currentYear) != getDayName(day) && day < 7 && !checkStartChecked) {
            // Show the result in the div
            $('#calendar .calendar-view').append(
                '<div class="calendar-day ' + classWeekend + '">' 
                    + dayName +
                '</div>'
            );        
        } else if (dayStart < daysInMonth(month, year)) {
            checkStartChecked = true;
            $('#calendar .calendar-view').append(
                '<div class="calendar-day calendar-day--current ' + classWeekend + '">' 
                    + dayName +
                    + (dayStart += 1) + 
                '</div>'
            );
        }


    }
}

/**
 * Switch calendar (previous or next)
 * @param {*} type 
 */
function switchCalendar(type) {
    if (currentMonth + type <= 0) {
        currentYear = currentYear - 1;
        generateCalendar(12, currentYear);
    } else if (currentMonth + type > 12){
        currentYear = currentYear + 1;
        generateCalendar(1, currentYear);
    } else {
        generateCalendar((currentMonth + type), currentYear);
    }
}

/**
 * Check the day when the month start
 * @param {} day 
 * @param {} month 
 * @param {*} year 
 * @returns 
 */
function checkStartMonth(day, month, year) {
    var date = new Date(month + '/' + day + '/' + year);
    return date.toLocaleDateString('ch-CH', { weekday: 'long' });    
}

/**
 * Check if a day is in the weekend
 * @param {} day 
 * @returns 
 */
function isWeekend(day) {
    return day % 7 === 6 || day % 7 === 0;
}

/** 
 * Get day name in french
 * @param {} index 
 * @returns 
 */
function getDayName(index) {
    var day = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    return day[index - 1];
}

/**
 * Return the number of days in a month
 * @param {} month 
 * @param {*} year 
 * @returns 
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * Return the name of the currentMonth
 * @param {*} month 
 */
function getMonthName(month, year) {
    const date = new Date(month + '/1/' + year);
    return date.toLocaleDateString('ch-CH', { month: 'long' });   
}