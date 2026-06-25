const { generateInterviewReport } = require('../services/ai.services');
const { parseResumeContent } = require('../utils/helper');

/**
 * @name generateReportController
 * @description Generate report based on provided resume, job description and self description
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
async function generateReportController(req, res) {
    const { jobDescription, selfDescription } = req.body;

    // check if the resume is provided or not
    if (!req.file) {
        return res.status(401).json({
            message: 'Resume PDF is required.'
        });
    }

    // check if job description of 
    if (!jobDescription || !selfDescription) {
        return res.status(401).json({
            message: "Please provide resume text, job description and self description."
        });
    }

    try {
        // parse the content of the resume file
        const resumeText = await parseResumeContent(req.file);
        console.log('resume text:', resumeText);

        const reportData = await generateInterviewReport(resumeText, selfDescription, jobDescription);
        res.status(200).json({
            message: 'Report generated successfully.',
            reportData: reportData
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to generate report.'
        });
    }
}

module.exports = { generateReportController }