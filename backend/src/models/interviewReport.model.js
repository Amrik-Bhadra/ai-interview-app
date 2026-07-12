import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Question is required."],
            trim: true,
        },
        intention: {
            type: String,
            required: [true, "Intention is required."],
            trim: true,
        },
        answer: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);

const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, "Skill is required."],
            trim: true,
        },
        severity: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: true,
        },
    },
    { _id: false }
);

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
            min: 1,
        },
        focus: {
            type: String,
            required: true,
            trim: true,
        },
        tasks: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { _id: false }
);

const interviewReportSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, "Role is required."],
            trim: true,
        },
        jobDescription: {
            type: String,
            required: [true, "Job description is required."],
            trim: true,
        },

        resumeText: {
            type: String,
            trim: true,
        },

        selfDescription: {
            type: String,
            trim: true,
        },

        matchScore: {
            type: Number,
            min: [0, "Match score cannot be below 0"],
            max: [100, "Match score cannot exceed 100"],
            default: 0,
        },

        technicalQuestions: {
            type: [questionSchema],
            default: [],
        },

        behavioralQuestions: {
            type: [questionSchema],
            default: [],
        },

        skillGaps: {
            type: [skillGapSchema],
            default: [],
        },

        preparationPlan: {
            type: [preparationPlanSchema],
            default: [],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        }
    },
    {
        timestamps: true,
    }
);

const InterviewReport = mongoose.model(
    'InterviewReport',
    interviewReportSchema
);

export default InterviewReport;