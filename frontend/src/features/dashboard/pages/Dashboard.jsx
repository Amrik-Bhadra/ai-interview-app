import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import ScreenLoader from "../../auth/components/ScreenLoader";
import ScoreTrendChart from "../components/ScoreTrendChart";
import SkillGapBars from "../components/SkillGapBars";
import "../styles/dashboard.scss";
import { usePageTitle } from "../../../hooks/usePageTitle";

const scoreTone = (s) => (s >= 80 ? "high" : s >= 60 ? "mid" : "low");

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const Dashboard = () => {
    usePageTitle("Dashboard");
    const { data, loading, error } = useDashboard();
    const navigate = useNavigate();

    if (loading) return <ScreenLoader label="Loading dashboard" />;

    if (error) {
        return (
            <div className="dashboard-error">
                <h3>Failed to load dashboard</h3>
                <p>{error}</p>
            </div>
        );
    }

    const isEmpty = !data || data.totalReports === 0;

    const kpis = [
        {
            label: "Total Reports",
            value: data?.totalReports ?? 0,
            sub: "All time",
        },
        {
            label: "Avg Match Score",
            value: `${data?.avgMatchScore ?? 0}%`,
            sub: "Across all reports",
        },
        {
            label: "Latest Score",
            value: `${data?.latestMatchScore ?? 0}%`,
            sub: "Most recent report",
            tone: scoreTone(data?.latestMatchScore ?? 0),
        },
        {
            label: "Skill Gaps Flagged",
            value: data?.totalSkillGaps ?? 0,
            sub: "Across all reports",
        },
    ];

    return (
        <div className="dashboard">

            {/* ── KPIs ── */}
            <div className="kpi-grid">
                {kpis.map((k) => (
                    <div className="kpi-card" key={k.label}>
                        <p className="kpi-label">{k.label}</p>
                        <h2 className={`kpi-value ${k.tone ?? ""}`}>{k.value}</h2>
                        <p className="kpi-sub">{k.sub}</p>
                    </div>
                ))}
            </div>

            {isEmpty ? (
                <div className="dashboard-empty">
                    <div className="empty-icon">📊</div>
                    <h3>No data yet</h3>
                    <p>Generate your first interview report to start seeing analytics here.</p>
                    <button
                        className="button primary-button"
                        onClick={() => navigate("/generate-report")}
                    >
                        Generate a report
                    </button>
                </div>
            ) : (
                <>
                    {/* ── Charts row ── */}
                    <div className="panel-grid">

                        {/* Match score trend */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Match score trend</h3>
                                <p>Last {data.scoreTrend.length} report{data.scoreTrend.length !== 1 ? "s" : ""}</p>
                            </div>
                            {data.scoreTrend.length < 2 ? (
                                <p className="panel-hint">
                                    Generate at least 2 reports to see your trend.
                                </p>
                            ) : (
                                <ScoreTrendChart points={data.scoreTrend} />
                            )}
                        </div>

                        {/* Top skill gaps */}
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Most common skill gaps</h3>
                                <p>Across all reports</p>
                            </div>
                            <SkillGapBars gaps={data.topSkillGaps} />
                        </div>
                    </div>

                    {/* ── Recent reports ── */}
                    <div className="panel">
                        <div className="panel-header">
                            <h3>Recent reports</h3>
                            <button
                                className="panel-link"
                                onClick={() => navigate("/reports")}
                            >
                                View all →
                            </button>
                        </div>
                        <div className="recent-list">
                            {data.recentReports.map((r) => (
                                <div className="recent-row" key={r._id}>
                                    <div className="recent-info">
                                        <p className="recent-role">{r.role}</p>
                                        <p className="recent-date">{formatDate(r.createdAt)}</p>
                                    </div>
                                    <div className="recent-right">
                                        <span className={`score-badge ${scoreTone(r.matchScore)}`}>
                                            {r.matchScore}%
                                        </span>
                                        <span className="recent-gaps">
                                            {r.skillGaps?.length ?? 0} gap{r.skillGaps?.length !== 1 ? "s" : ""}
                                        </span>
                                        <button
                                            className="button ghost-button small"
                                            onClick={() => navigate(`/reports/${r._id}`)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;