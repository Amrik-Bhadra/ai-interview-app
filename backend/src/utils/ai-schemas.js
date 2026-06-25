const { z } = require("zod");

const interviewReportAISchema = z.object({
    // 1. Added the missing matchScore field
    matchScore: z.number()
        .min(0)
        .max(100)
        .describe("An overall match score between 0 and 100 calculated by comparing the candidate's profile against the job description."),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("A realistic and role-specific technical interview question."),
            intention: z.string().describe("Explain exactly what the interviewer is trying to evaluate."),
            answer: z.string().describe(
                "A comprehensive Markdown-formatted interview preparation guide. " +
                "Must include separate sections: ### Approach, ### Key Concepts, ### Experiences to Highlight, " +
                "### Common Mistakes to Avoid, and ### Ideal Structure."
            )
        })
    ).describe("Tailored technical interview questions."),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("A realistic behavioral or situational interview question."),
            intention: z.string().describe("The behavioral traits or soft skills being evaluated."),
            answer: z.string().describe("A preparation guide using the STAR framework, detailing pitfalls to avoid.")
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe("The specific skill or technology gap identified."),
            severity: z.enum(["low", "medium", "high"]).describe("The importance of this gap relative to the target role.")
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe("The sequential day number starting from 1."),
            focus: z.string().describe("The primary actionable learning objective for this day."),
            tasks: z.array(z.string()).describe("List of concrete, measurable tasks to complete.")
        })
    )
});

module.exports = { interviewReportAISchema };