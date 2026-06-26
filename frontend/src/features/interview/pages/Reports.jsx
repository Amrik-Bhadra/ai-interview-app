import { useNavigate } from "react-router-dom";
import "../style/reports.scss";

// TODO: replace with real fetch from your reports API
const dummyReports = [
  { id: "1", role: "Senior Backend Engineer", matchScore: 85, date: "Jun 21, 2026", skillGaps: 2 },
  { id: "2", role: "Frontend Developer", matchScore: 72, date: "Jun 18, 2026", skillGaps: 4 },
  { id: "3", role: "Full Stack Engineer", matchScore: 91, date: "Jun 10, 2026", skillGaps: 1 },
];

const scoreTone = (score) => (score >= 80 ? "high" : score >= 60 ? "mid" : "low");

const Reports = () => {
  const navigate = useNavigate();

  if (dummyReports.length === 0) {
    return (
      <div className="reports-empty">
        <h3>No reports yet</h3>
        <p>Generate your first interview report to see it listed here.</p>
        <button className="button primary-button" onClick={() => navigate("/generate-report")}>
          Generate a report
        </button>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-table">
        <div className="table-row table-head">
          <span>Role</span>
          <span>Match score</span>
          <span>Skill gaps</span>
          <span>Generated on</span>
          <span></span>
        </div>

        {dummyReports.map((report) => (
          <div className="table-row" key={report.id}>
            <span className="role-cell">{report.role}</span>
            <span><span className={`score-badge ${scoreTone(report.matchScore)}`}>{report.matchScore}%</span></span>
            <span>{report.skillGaps}</span>
            <span className="muted">{report.date}</span>
            <span>
              <button className="button ghost-button small" onClick={() => navigate(`/reports/${report.id}`)}>
                View report
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;