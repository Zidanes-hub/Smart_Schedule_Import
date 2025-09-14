
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
    onFileChange: (file: File) => void;
    imagePreview: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, imagePreview }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            onFileChange(files[0]);
        }
    };

    const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    }, [onFileChange]);

    return (
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">1. Upload Schedule</h3>
            <label 
                htmlFor="file-upload"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                ${isDragging 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50' 
                    : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
            >
                {imagePreview ? (
                     <img src={imagePreview} alt="Schedule preview" className="max-h-full max-w-full object-contain p-2 rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <UploadIcon />
                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG or GIF</p>
                    </div>
                )}
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
            </label>
        </div>
    );
};
