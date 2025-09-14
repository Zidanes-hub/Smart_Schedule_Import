
import React from 'react';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    return (
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">2. Set Semester Dates</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                     <label htmlFor="end-date" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
};
