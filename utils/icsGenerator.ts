
import { type ScheduleEntry } from '../types';

const dayToICalDay: { [key: string]: string } = {
    'SENIN': 'MO',
    'SELASA': 'TU',
    'RABU': 'WE',
    'KAMIS': 'TH',
    'JUMAT': 'FR',
    'SABTU': 'SA',
    'MINGGU': 'SU'
};

const dayToIndex: { [key:string]: number } = {
    'MINGGU': 0,
    'SENIN': 1,
    'SELASA': 2,
    'RABU': 3,
    'KAMIS': 4,
    'JUMAT': 5,
    'SABTU': 6
};

// Function to generate a random UID
const generateUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Function to format date/time for iCal
const formatICalDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const formatICalDateWithTZ = (date: Date, tz: string): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

export function generateIcsContent(schedule: ScheduleEntry[], semesterStartDate: Date, semesterEndDate: Date): string {
    const timezone = 'Asia/Jakarta';
    
    // Set end date to the end of the day
    semesterEndDate.setHours(23, 59, 59);

    const events = schedule.map(entry => {
        const iCalDay = dayToICalDay[entry.day.toUpperCase()];
        if (!iCalDay) {
            console.warn(`Invalid day: ${entry.day}`);
            return '';
        }

        const [startHour, startMinute] = entry.startTime.split(':').map(Number);
        const [endHour, endMinute] = entry.endTime.split(':').map(Number);

        // Find the first occurrence of the class day on or after the semester start date
        const firstOccurrenceDate = new Date(semesterStartDate.getTime());
        const targetDayIndex = dayToIndex[entry.day.toUpperCase()];
        const currentDayIndex = firstOccurrenceDate.getDay();
        
        let dayDifference = targetDayIndex - currentDayIndex;
        if (dayDifference < 0) {
            dayDifference += 7;
        }
        firstOccurrenceDate.setDate(firstOccurrenceDate.getDate() + dayDifference);
        
        const dtstart = new Date(firstOccurrenceDate);
        dtstart.setHours(startHour, startMinute, 0, 0);

        const dtend = new Date(firstOccurrenceDate);
        dtend.setHours(endHour, endMinute, 0, 0);

        const untilDate = formatICalDate(semesterEndDate);
        
        const description = `Dosen: ${entry.lecturer || 'N/A'}`;

        return [
            'BEGIN:VEVENT',
            `UID:${generateUID()}@smartschedule.importer`,
            `DTSTAMP:${formatICalDate(new Date())}`,
            `SUMMARY:${entry.courseName}`,
            `DTSTART;TZID=${timezone}:${formatICalDateWithTZ(dtstart, timezone)}`,
            `DTEND;TZID=${timezone}:${formatICalDateWithTZ(dtend, timezone)}`,
            `RRULE:FREQ=WEEKLY;UNTIL=${untilDate};BYDAY=${iCalDay}`,
            `LOCATION:${entry.location}`,
            `DESCRIPTION:${description}`,
            'END:VEVENT'
        ].join('\r\n');
    }).join('\r\n');

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SmartScheduleImporter//EN',
        'CALSCALE:GREGORIAN',
        events,
        'END:VCALENDAR'
    ].join('\r\n');
}
