import InterviewReport from '../models/interviewReport.model.js';
import mongoose from 'mongoose';

export async function getDashboardStats(userId) {
    const objectId = new mongoose.Types.ObjectId(userId);
    const [summary, scoreTrend, skillGapStats, recentReports] = await Promise.all([

        // KPI summary
        InterviewReport.aggregate([
            { $match: { user: objectId } },
            {
                $group: {
                    _id: null,
                    totalReports: { $sum: 1 },
                    avgMatchScore: { $avg: "$matchScore" },
                    latestMatchScore: { $last: "$matchScore" },
                    totalSkillGaps: { $sum: { $size: "$skillGaps" } },
                }
            }
        ]),

        // Match score trend (last 10 reports, oldest → newest)
        InterviewReport.aggregate([
            { $match: { user: objectId } },
            { $sort: { createdAt: 1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 1,
                    role: 1,
                    matchScore: 1,
                    date: { $dateToString: { format: "%b %d", date: "$createdAt" } }
                }
            }
        ]),

        // Skill gap analysis
        InterviewReport.aggregate([
            { $match: { user: objectId } },
            { $unwind: "$skillGaps" },
            {
                $group: {
                    _id: "$skillGaps.skill",
                    count: { $sum: 1 },
                    severity: { $first: "$skillGaps.severity" }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 6 },
            {
                $project: {
                    _id: 0,
                    skill: "$_id",
                    count: 1,
                    severity: 1
                }
            }
        ]),

        // Recent reports (last 3)
        InterviewReport.find({ user: objectId })
            .sort({ createdAt: -1 })
            .limit(3)
            .select("role matchScore skillGaps createdAt")
            .lean()
    ]);

    const kpis = summary[0] ?? {
        totalReports: 0,
        avgMatchScore: 0,
        latestMatchScore: 0,
        totalSkillGaps: 0,
    };

    return {
        totalReports: kpis.totalReports,
        avgMatchScore: Math.round(kpis.avgMatchScore ?? 0),
        latestMatchScore: kpis.latestMatchScore ?? 0,
        totalSkillGaps: kpis.totalSkillGaps,
        scoreTrend: scoreTrend,
        topSkillGaps: skillGapStats,
        recentReports: recentReports,
    };
}