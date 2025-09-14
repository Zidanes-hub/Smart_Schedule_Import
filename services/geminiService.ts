
import { GoogleGenAI, Type } from "@google/genai";
import { type ParsedSchedule } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const scheduleSchema = {
    type: Type.OBJECT,
    properties: {
        schedule: {
            type: Type.ARRAY,
            description: "An array of course schedule objects.",
            items: {
                type: Type.OBJECT,
                properties: {
                    courseName: { type: Type.STRING, description: 'Full name of the course (Mata Kuliah).' },
                    day: { type: Type.STRING, description: "Day of the week in Indonesian (e.g., 'Senin', 'Selasa')." },
                    startTime: { type: Type.STRING, description: "Start time in HH:mm format (e.g., '08:30')." },
                    endTime: { type: Type.STRING, description: "End time in HH:mm format (e.g., '10:30')." },
                    location: { type: Type.STRING, description: 'Location or room code (Ruangan).' },
                    lecturer: { type: Type.STRING, description: 'Lecturer code or name (Kode Dosen).' },
                },
                required: ['courseName', 'day', 'startTime', 'endTime', 'location', 'lecturer']
            }
        }
    },
    required: ['schedule']
};

export async function parseScheduleFromImage(base64Image: string, mimeType: string): Promise<ParsedSchedule> {
    const prompt = `
        You are an expert schedule parser for university students in Indonesia.
        Analyze the provided image of a course schedule from Telkom University.
        Extract the following details for each distinct course session:
        - Nama Mata Kuliah (courseName)
        - Hari (day)
        - Waktu Mulai (startTime) in HH:mm format
        - Waktu Selesai (endTime) in HH:mm format. If a course spans multiple consecutive time slots (e.g., 08:30, 09:30, 10:30), consolidate it into a single entry with the earliest start time and the latest end time. For example, a class from 08:30 to 10:30 is one entry.
        - Lokasi/Ruangan (location)
        - Kode Dosen (lecturer)
        
        Carefully examine both the calendar view and the table view in the document to get all the details.
        Return the data as a single, well-formed JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
    `;

    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: 'application/json',
            responseSchema: scheduleSchema,
        },
    });
    
    const jsonString = response.text;
    
    try {
        const parsedJson = JSON.parse(jsonString);
        return parsedJson as ParsedSchedule;
    } catch (e) {
        console.error("Failed to parse JSON from Gemini response:", jsonString);
        throw new Error("The AI returned an invalid data format. Please try again.");
    }
}
