
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface DownloadButtonProps {
    content: string;
    disabled: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ content, disabled }) => {
    const handleDownload = () => {
        if (disabled) return;
        const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'schedule.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={disabled}
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            <DownloadIcon />
            Download .ics File
        </button>
    );
};
