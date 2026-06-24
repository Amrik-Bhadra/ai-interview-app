const { generateInterviewReport } = require('../services/ai.services');

/**
 * @name generateReportController
 * @description Generate report based on provided resume, job description and self description
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
async function generateReportController(req, res) {
    const { resumeText, jobDescription, selfDescription } = req.body;

    if (!resumeText || !jobDescription || !selfDescription) {
        return res.status(401).json({
            message: "Please provide resume text, job description and self description."
        });
    }

    try {
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