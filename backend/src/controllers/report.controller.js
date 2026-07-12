import InterviewReport from '../models/interviewReport.model.js';
import { generateInterviewReport } from '../services/ai.services.js';
import { getDashboardStats } from "../services/report.service.js"
import { parseResumeContent } from '../utils/helper.js';

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

        const reportData = await generateInterviewReport({ resumeText, selfDescription, jobDescription });

        const savedReport = await InterviewReport.create({
            role: reportData.role,
            jobDescription,
            resumeText,
            selfDescription,
            matchScore: reportData.matchScore,
            technicalQuestions: reportData.technicalQuestions,
            behavioralQuestions: reportData.behavioralQuestions,
            skillGaps: reportData.skillGaps,
            preparationPlan: reportData.preparationPlan,
            user: req.user.id
        });

        res.status(200).json({
            message: 'Report generated successfully.',
            reportData: savedReport,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to generate report.'
        });
    }
}

/**
 * @name getReportController
 * @description Fetch complete details of a generated report
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
async function getReportController(req, res) {
    try {
        const report = await InterviewReport.findOne({ _id: req.params.id, user: req.user.id })
            .populate('user', 'username email');
        if (!report) return res.status(404).json({ message: 'Report not found.' });
        res.status(200).json({ reportData: report });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch report.' });
    }
}


/**
 * @name listReportsController
 * @description List all generated reports
 * @access Private
 * @param {*} req 
 * @param {*} res 
 */
async function listReportsController(req, res) {
    try {
        const reports = await InterviewReport.find({ user: req.user.id })
            .select('role jobDescription matchScore skillGaps createdAt')
            .sort({ createdAt: -1 });
        res.status(200).json({ reports });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
}

/**
 * @name getDashboardController
 * @description Returns aggregated analytics for the logged-in user's dashboard
 */
async function getDashboardController(req, res) {
    try {
        const userId = req.user.id;
        const data = await getDashboardStats(userId);
        return res.status(200).json({ dashboard: data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to load dashboard data." });
    }
}

export { 
    generateReportController, 
    getReportController, 
    listReportsController, 
    getDashboardController 
};