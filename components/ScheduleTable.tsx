
import React from 'react';
import { type ScheduleEntry } from '../types';

interface ScheduleTableProps {
    schedule: ScheduleEntry[];
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Course Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Day</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Lecturer</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                    {schedule.map((entry, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{entry.courseName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{entry.day}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{entry.startTime} - {entry.endTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{entry.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{entry.lecturer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
