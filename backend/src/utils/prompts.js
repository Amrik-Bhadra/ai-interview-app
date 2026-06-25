const reportGenerationPrompt = ({
    resumeText,
    selfDescription,
    jobDescription
}) => `
You are an expert Technical Interviewer and Engineering Manager. Generate a deeply personalized interview preparation report based on the candidate's materials and the target job description.

------------------------
CANDIDATE RESUME:
${resumeText || "Not provided"}

------------------------
CANDIDATE SELF DESCRIPTION:
${selfDescription || "Not provided"}

------------------------
TARGET JOB DESCRIPTION:
${jobDescription}

------------------------
CRITICAL STRUCTURAL INSTRUCTIONS FOR 'answer' FIELDS:
For every technical and behavioral question, compile the text within the "answer" string using clean Markdown syntax structured exactly as follows:

### Approach
[Provide the high-level thought process]

### Key Concepts
- **Concept 1**: Brief description
- **Concept 2**: Brief description

### Experiences to Highlight
[Guidance on utilizing previous project experiences]

### Common Mistakes to Avoid
- Avoid mistake X
- Avoid mistake Y

### Ideal Structure
1. Opening point...
2. Technical core...
3. Trade-offs/Conclusion...

Ensure all fields are fully populated and strict JSON types are respected.
`;

module.exports = { reportGenerationPrompt };