import { GoogleGenAI } from "@google/genai";
import { interviewReportJsonSchema, interviewReportAISchema } from '../utils/ai-schemas.js';
import { reportGenerationPrompt } from "../utils/prompts.js";

export async function generateInterviewReport({ resumeText, selfDescription, jobDescription }) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });

    const prompt = reportGenerationPrompt({ resumeText, selfDescription, jobDescription });

    if (!interviewReportJsonSchema?.properties || Object.keys(interviewReportJsonSchema.properties).length === 0) {
        throw new Error("interviewReportJsonSchema is empty — schema generation failed.");
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: interviewReportJsonSchema,
        },
    });

    const text = response.text?.trim();

    if (!text || text === '{}' || text === '{ }') {
        throw new Error("AI returned empty response.");
    }

    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (err) {
        console.error("JSON parse failed. Raw text:", text);
        throw new Error("Failed to parse AI response as JSON.");
    }

    try {
        return interviewReportAISchema.parse(parsed);
    } catch (err) {
        console.error("Zod validation failed:", err.errors ?? err);
        throw new Error("AI response did not match expected schema.");
    }
}