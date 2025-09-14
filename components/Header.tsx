
import React from 'react';
import { CalendarIcon } from './icons/CalendarIcon';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 rounded-full p-4 mb-4">
                 <CalendarIcon />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                Smart Schedule Importer
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Turn your course schedule image into a calendar-ready file in seconds.
                Upload, set your dates, and let our AI assistant do the rest.
            </p>
        </header>
    );
}
