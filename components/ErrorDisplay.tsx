
import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 m-8 rounded-r-lg" role="alert">
            <div className="flex">
                <div className="py-1">
                   <AlertTriangleIcon />
                </div>
                <div>
                    <p className="font-bold ml-3">An Error Occurred</p>
                    <p className="text-sm ml-3">{message}</p>
                </div>
            </div>
        </div>
    );
};
