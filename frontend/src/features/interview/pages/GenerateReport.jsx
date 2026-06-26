import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeUploader from "../components/ResumeUploader";
import GeneratingModal from "../components/GeneratingModal";
import "../style/generate-report.scss";

const GenerateReport = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const canGenerate = resume && jobDescription.trim() && selfDescription.trim();

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setIsComplete(false);

    try {
      // TODO: replace with real API call
      // const formData = new FormData();
      // formData.append("resume", resume);
      // formData.append("jobDescription", jobDescription);
      // formData.append("selfDescription", selfDescription);
      // const res = await api.post("/reports/generate", formData);

      await new Promise((resolve) => setTimeout(resolve, 4000)); // simulate API
      setIsComplete(true);

      setTimeout(() => {
        navigate("/reports"); // or navigate(`/reports/${res.data.reportId}`)
      }, 700);
    } catch (err) {
      console.log(err);
      setIsGenerating(false);
      // TODO: surface error toast
    }
  };

  return (
    <div className="generate-report">
      <div className="page-intro">
        <h2>Generate an interview report</h2>
        <p>Upload a resume alongside the job description to get tailored interview questions, a match score, and a prep plan.</p>
      </div>

      <div className="report-form">
        <div className="form-card">
          <label htmlFor="jobDescription">Job description</label>
          <textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="form-card right-card">
          <div className="field-block">
            <div className="field-heading">
              <label>Resume</label>
              <small>Use resume and self description together for best results</small>
            </div>
            <ResumeUploader file={resume} onFileSelect={setResume} onRemove={() => setResume(null)} />
          </div>

          <div className="field-block grow">
            <label htmlFor="selfDescription">Self description</label>
            <textarea
              id="selfDescription"
              placeholder="Tell us about your experience, strengths, and what you're targeting..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          <button
            className="button primary-button full-width"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            Generate interview report
          </button>
        </div>
      </div>

      {isGenerating && <GeneratingModal isComplete={isComplete} />}
    </div>
  );
};

export default GenerateReport;