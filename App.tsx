
import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { DateRangePicker } from './components/DateRangePicker';
import { ScheduleTable } from './components/ScheduleTable';
import { DownloadButton } from './components/DownloadButton';
import { Loader } from './components/Loader';
import { generateIcsContent } from './utils/icsGenerator';
import { parseScheduleFromImage } from './services/geminiService';
import { type ScheduleEntry } from './types';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [schedule, setSchedule] = useState<ScheduleEntry[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [icsContent, setIcsContent] = useState<string>('');

    const handleFileChange = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleAnalyze = useCallback(async () => {
        if (!imageBase64 || !startDate || !endDate) {
            setError("Please upload a schedule image and select the semester start and end dates.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSchedule(null);
        setIcsContent('');

        try {
            const mimeType = imageFile?.type;
            if (!mimeType) {
                throw new Error("Could not determine file MIME type.");
            }
            // Remove the base64 prefix e.g. "data:image/png;base64,"
            const pureBase64 = imageBase64.split(',')[1];

            const parsedData = await parseScheduleFromImage(pureBase64, mimeType);
            
            if (parsedData && parsedData.schedule.length > 0) {
                setSchedule(parsedData.schedule);
                const content = generateIcsContent(parsedData.schedule, new Date(startDate), new Date(endDate));
                setIcsContent(content);
            } else {
                 setError("The AI could not detect any schedule entries. Please try with a clearer image.");
            }
        } catch (err) {
            console.error(err);
            setError(`An error occurred during analysis: ${err instanceof Error ? err.message : 'Unknown error'}. Please check the console for details.`);
        } finally {
            setIsLoading(false);
        }
    }, [imageBase64, startDate, endDate, imageFile]);

    const isAnalyzeDisabled = !imageBase64 || !startDate || !endDate || isLoading;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <main className="container mx-auto px-4 py-8">
                <Header />
                <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-8">
                        <Instructions />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                           <FileUpload onFileChange={handleFileChange} imagePreview={imageBase64} />
                           <DateRangePicker 
                                startDate={startDate} 
                                endDate={endDate} 
                                onStartDateChange={setStartDate} 
                                onEndDateChange={setEndDate} 
                            />
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzeDisabled}
                                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                {isLoading ? 'Analyzing...' : 'Analyze Schedule'}
                            </button>
                        </div>
                    </div>
                    
                    {isLoading && <Loader />}
                    {error && <ErrorDisplay message={error} />}

                    {schedule && (
                        <div className="p-8 border-t border-slate-200 dark:border-slate-700">
                             <h3 className="text-2xl font-bold text-center text-indigo-500 mb-6">Extracted Schedule</h3>
                             <ScheduleTable schedule={schedule} />
                             <div className="mt-8 text-center">
                                <DownloadButton content={icsContent} disabled={!icsContent} />
                             </div>
                        </div>
                    )}
                </div>
                <footer className="text-center mt-12 text-slate-500 dark:text-slate-400">
                    <p>Powered by Gemini API</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
