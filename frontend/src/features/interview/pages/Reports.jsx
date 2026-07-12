import { useNavigate } from "react-router-dom";
import { useReports } from "../hooks/useReports";
import ScreenLoader from "../../auth/components/ScreenLoader.jsx";
import "../style/reports.scss";
import { usePageTitle } from "../../../hooks/usePageTitle.js";

const scoreTone = (score) => (score >= 80 ? "high" : score >= 60 ? "mid" : "low");

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const Reports = () => {
    usePageTitle("Reports");
    const navigate = useNavigate();
    const { reports, loading, error, refetch } = useReports();

    if (loading) return <ScreenLoader label="Loading your reports" />;

    if (error) {
        return (
            <div className="reports-empty">
                <h3>Something went wrong</h3>
                <p>{error}</p>
                <button className="button primary-button" onClick={refetch}>
                    Try again
                </button>
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="reports-empty">
                <h3>No reports yet</h3>
                <p>Generate your first interview report to see it listed here.</p>
                <button
                    className="button primary-button"
                    onClick={() => navigate("/generate-report")}
                >
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

                {reports.map((report) => (
                    <div className="table-row" key={report._id}>
                        <span className="role-cell">{report.role}</span>
                        <span>
                            <span className={`score-badge ${scoreTone(report.matchScore)}`}>
                                {report.matchScore}%
                            </span>
                        </span>
                        <span>{report.skillGaps?.length ?? 0}</span>
                        <span className="muted">{formatDate(report.createdAt)}</span>
                        <span>
                            <button
                                className="button ghost-button small"
                                onClick={() => navigate(`/reports/${report._id}`)}
                            >
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