
import React from 'react';

export const Instructions: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">How It Works</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
                Follow these simple steps to import your schedule:
            </p>
            <ol className="list-decimal list-inside mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                <li><span className="font-semibold text-slate-700 dark:text-slate-300">Upload your schedule:</span> Click or drag your schedule image file into the box.</li>
                <li><span className="font-semibold text-slate-700 dark:text-slate-300">Set semester dates:</span> Select the start and end dates for your semester.</li>
                <li><span className="font-semibold text-slate-700 dark:text-slate-300">Analyze & Download:</span> Click the "Analyze" button. Review the extracted data, then download the `.ics` file.</li>
            </ol>
        </div>
    )
}
