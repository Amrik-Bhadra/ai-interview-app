import { GoogleGenAI } from "@google/genai";
import { interviewReportAISchema } from '../utils/ai-schemas.js';
import { reportGenerationPrompt } from "../utils/prompts.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

export async function generateInterviewReport({
    resumeText,
    selfDescription,
    jobDescription
}) {
    const prompt = reportGenerationPrompt({
        resumeText,
        selfDescription,
        jobDescription
    });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseJsonSchema: interviewReportAISchema
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Failed to parse clean JSON structured output:", error);
        throw new Error("Failed to generate report");
    }
}