// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ResumeUploader from "../components/ResumeUploader";
// import GeneratingModal from "../components/GeneratingModal";
// import { generateReport } from "../services/interview.api";
// import "../style/generate-report.scss";

// const getErrorMessage = (err) =>
//     err?.response?.data?.message ?? "Failed to generate report. Please try again.";

// const GenerateReport = () => {
//     const navigate = useNavigate();

//     const [resume, setResume] = useState(null);
//     const [jobDescription, setJobDescription] = useState("");
//     const [selfDescription, setSelfDescription] = useState("");
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [isComplete, setIsComplete] = useState(false);
//     const [error, setError] = useState("");

//     const canGenerate =
//         resume !== null &&
//         jobDescription.trim().length > 0 &&
//         selfDescription.trim().length > 0;

//     const handleGenerate = async () => {
//         if (!canGenerate || isGenerating) return;

//         setError("");
//         setIsGenerating(true);
//         setIsComplete(false);

//         try {
//             const formData = new FormData();
//             formData.append("resume", resume);               // matches upload.single("resume")
//             formData.append("jobDescription", jobDescription.trim());
//             formData.append("selfDescription", selfDescription.trim());

//             const { reportData } = await generateReport(formData);

//             setIsComplete(true);

//             // Small delay so the modal's "done" state is visible before navigating
//             setTimeout(() => {
//                 navigate(`/reports/${reportData._id}`);
//             }, 800);
//         } catch (err) {
//             setError(getErrorMessage(err));
//             setIsGenerating(false);
//             setIsComplete(false);
//         }
//     };

//     return (
//         <div className="generate-report">
//             <div className="page-intro">
//                 <h2>Generate an interview report</h2>
//                 <p>
//                     Upload a resume alongside the job description to get tailored
//                     interview questions, a match score, and a personalised prep plan.
//                 </p>
//             </div>

//             {error && (
//                 <div className="generate-error" role="alert">
//                     {error}
//                 </div>
//             )}

//             <div className="report-form">
//                 {/* ── Left — Job description ── */}
//                 <div className="form-card">
//                     <label htmlFor="jobDescription">Job description</label>
//                     <textarea
//                         id="jobDescription"
//                         placeholder="Paste the job description here..."
//                         value={jobDescription}
//                         onChange={(e) => setJobDescription(e.target.value)}
//                         disabled={isGenerating}
//                     />
//                 </div>

//                 {/* ── Right — Resume + Self description + CTA ── */}
//                 <div className="form-card right-card">
//                     <div className="field-block">
//                         <div className="field-heading">
//                             <label>Resume</label>
//                             <small>
//                                 Use resume and self description together for best results
//                             </small>
//                         </div>
//                         <ResumeUploader
//                             file={resume}
//                             onFileSelect={setResume}
//                             onRemove={() => setResume(null)}
//                             disabled={isGenerating}
//                         />
//                     </div>

//                     <div className="field-block grow">
//                         <label htmlFor="selfDescription">Self description</label>
//                         <textarea
//                             id="selfDescription"
//                             placeholder="Tell us about your experience, strengths, and what you're targeting..."
//                             value={selfDescription}
//                             onChange={(e) => setSelfDescription(e.target.value)}
//                             disabled={isGenerating}
//                         />
//                     </div>

//                     <button
//                         className="button primary-button full-width"
//                         disabled={!canGenerate || isGenerating}
//                         onClick={handleGenerate}
//                     >
//                         Generate interview report
//                     </button>
//                 </div>
//             </div>

//             {isGenerating && <GeneratingModal isComplete={isComplete} />}
//         </div>
//     );
// };

// export default GenerateReport;



import { useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import GeneratingModal from "../components/GeneratingModal";
import ReportReadyModal from "../components/ReportReadyModal";
import { generateReport } from "../services/interview.api";
import "../style/generate-report.scss";

const getErrorMessage = (err) =>
    err?.response?.data?.message ?? "Failed to generate report. Please try again.";

const GenerateReport = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState("");
    const [generatedReport, setGeneratedReport] = useState(null); // holds report for ready modal

    const canGenerate =
        resume !== null &&
        jobDescription.trim().length > 0 &&
        selfDescription.trim().length > 0;

    const handleGenerate = async () => {
        if (!canGenerate || isGenerating) return;

        setError("");
        setIsGenerating(true);
        setIsComplete(false);
        setGeneratedReport(null);

        try {
            const formData = new FormData();
            formData.append("resume", resume);
            formData.append("jobDescription", jobDescription.trim());
            formData.append("selfDescription", selfDescription.trim());

            const { reportData } = await generateReport(formData);

            setIsComplete(true);

            // Brief pause so the modal's "done" step is visible, then swap to ready modal
            setTimeout(() => {
                setIsGenerating(false);
                setGeneratedReport(reportData);
            }, 900);
        } catch (err) {
            setError(getErrorMessage(err));
            setIsGenerating(false);
            setIsComplete(false);
        }
    };

    const handleCloseReadyModal = () => {
        setGeneratedReport(null);
        // Reset form for a fresh report
        setResume(null);
        setJobDescription("");
        setSelfDescription("");
    };

    return (
        <div className="generate-report">
            <div className="page-intro">
                <h2>Generate an interview report</h2>
                <p>
                    Upload a resume alongside the job description to get tailored
                    interview questions, a match score, and a personalised prep plan.
                </p>
            </div>

            {error && (
                <div className="generate-error" role="alert">
                    {error}
                </div>
            )}

            <div className="report-form">
                <div className="form-card">
                    <label htmlFor="jobDescription">Job description</label>
                    <textarea
                        id="jobDescription"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        disabled={isGenerating}
                    />
                </div>

                <div className="form-card right-card">
                    <div className="field-block">
                        <div className="field-heading">
                            <label>Resume</label>
                            <small>
                                Use resume and self description together for best results
                            </small>
                        </div>
                        <ResumeUploader
                            file={resume}
                            onFileSelect={setResume}
                            onRemove={() => setResume(null)}
                            disabled={isGenerating}
                        />
                    </div>

                    <div className="field-block grow">
                        <label htmlFor="selfDescription">Self description</label>
                        <textarea
                            id="selfDescription"
                            placeholder="Tell us about your experience, strengths, and what you're targeting..."
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                            disabled={isGenerating}
                        />
                    </div>

                    <button
                        className="button primary-button full-width"
                        disabled={!canGenerate || isGenerating}
                        onClick={handleGenerate}
                    >
                        Generate interview report
                    </button>
                </div>
            </div>

            {/* Step 1 — AI is working */}
            {isGenerating && <GeneratingModal isComplete={isComplete} />}

            {/* Step 2 — Report ready summary */}
            <ReportReadyModal
                report={generatedReport}
                onClose={handleCloseReadyModal}
            />
        </div>
    );
};

export default GenerateReport;