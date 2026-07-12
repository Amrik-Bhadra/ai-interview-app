import { useParams, Link } from "react-router-dom";
import { useReportDetails } from "../hooks/useReportDetails";
import ScoreGauge from "../components/ScoreGauge";
import QuestionAccordion from "../components/QuestionAccordion";
import ScreenLoader from "../../auth/components/ScreenLoader.jsx";
import ExpandableText from "../components/ExpandableText";
import "../style/report-detail.scss";
import { usePageTitle } from "../../../hooks/usePageTitle";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const ReportDetail = () => {
  usePageTitle("Report Details")
  const { id } = useParams();
  const { report, loading, error } = useReportDetails(id);

  if (loading) return <ScreenLoader label="Loading your report" />;

  if (error) {
    return (
      <div className="report-detail">
        <div className="report-error">
          <h3>Failed to load report</h3>
          <p>{error}</p>
          <Link to="/reports" className="button primary-button">
            Back to reports
          </Link>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="report-detail">
      {/* ── Header ── */}
      <div className="report-header">
        <div className="header-text">
          <p className="report-id">Report · {formatDate(report.createdAt)}</p>
          <h2>{report.role}</h2>
          <p className="header-sub">
            Prepared for <strong>{report.user?.username}</strong> based on the
            job description and resume below.
          </p>
        </div>
        <ScoreGauge score={report.matchScore} />
      </div>

      {/* ── Summary cards ── */}
      <div className="summary-grid">
        <div className="summary-card">
          <p className="block-label">Job description</p>
          <ExpandableText text={report.jobDescription} />
        </div>
        <div className="summary-card">
          <p className="block-label">Resume</p>
          <ExpandableText text={report.resumeText} />
        </div>
        <div className="summary-card">
          <p className="block-label">Self description</p>
          <ExpandableText text={report.selfDescription} />
        </div>
      </div>

      {/* ── Skill gaps ── */}
      {report.skillGaps?.length > 0 && (
        <div className="skillgap-section">
          <h3>Skill gaps identified</h3>
          <div className="skillgap-list">
            {report.skillGaps.map((gap) => (
              <span
                key={gap.skill}
                className={`skillgap-badge ${gap.severity}`}
              >
                {gap.skill}
                <em>{gap.severity}</em>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Technical questions ── */}
      {report.technicalQuestions?.length > 0 && (
        <div className="questions-section">
          <h3>Technical questions</h3>
          <div className="question-list">
            {report.technicalQuestions.map((q, i) => (
              <QuestionAccordion key={i} index={i} {...q} />
            ))}
          </div>
        </div>
      )}

      {/* ── Behavioral questions ── */}
      {report.behavioralQuestions?.length > 0 && (
        <div className="questions-section">
          <h3>Behavioral questions</h3>
          <div className="question-list">
            {report.behavioralQuestions.map((q, i) => (
              <QuestionAccordion key={i} index={i} {...q} />
            ))}
          </div>
        </div>
      )}

      {/* ── Preparation plan ── */}
      {report.preparationPlan?.length > 0 && (
        <div className="prep-section">
          <h3>Preparation plan</h3>
          <div className="prep-timeline">
            {report.preparationPlan.map((day) => (
              <div className="prep-day" key={day.day}>
                <div className="prep-day-marker">Day {day.day}</div>
                <div className="prep-day-content">
                  <h4>{day.focus}</h4>
                  <ul>
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/reports" className="back-link">
        &larr; Back to all reports
      </Link>
    </div>
  );
};

export default ReportDetail;
