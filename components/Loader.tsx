
import React from 'react';

const loadingMessages = [
    "Contacting the AI assistant...",
    "Analyzing schedule structure...",
    "Extracting course details...",
    "Consolidating timetable...",
    "Almost there, finalizing results..."
];

export const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="w-16 h-16 border-4 border-t-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg transition-opacity duration-500">
                {loadingMessages[messageIndex]}
            </p>
        </div>
    );
};
