const { GoogleGenAI } = require("@google/genai");
const { zodToJsonSchema } = require('zod-to-json-schema');
const { interviewReportAISchema } = require('../utils/ai-schemas');
const { reportGenerationPrompt } = require("../utils/prompts");
const { mockInterviewReport } = require("../utils/mock-data");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function generateInterviewReport({
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
        // const response = await ai.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: prompt,
        //     config: {
        //         responseMimeType: 'application/json',
        //         responseJsonSchema: interviewReportAISchema
        //     }
        // });

        // const reportData = JSON.parse(response.text);
        return mockInterviewReport;
    } catch (error) {
        console.error("Failed to parse clean JSON structured output:", error);
        throw new Error("Failed to generate report");
    }
}

module.exports = { generateInterviewReport };