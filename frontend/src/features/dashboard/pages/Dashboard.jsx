import "../styles/dashboard.scss";

const kpis = [
  { label: "Total Reports", value: "24", trend: "+4 this week" },
  { label: "Avg Match Score", value: "78%", trend: "+3% vs last month" },
  { label: "Reports This Week", value: "6", trend: "On track" },
  { label: "Skill Gaps Flagged", value: "11", trend: "Across all reports" },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="kpi-card" key={k.label}>
            <p className="kpi-label">{k.label}</p>
            <h2 className="kpi-value">{k.value}</h2>
            <p className="kpi-trend">{k.trend}</p>
          </div>
        ))}
      </div>

      <div className="panel-grid">
        <div className="panel placeholder-panel">
          <h3>Match score trend</h3>
          <p>Chart will appear here once enough report data is available.</p>
        </div>
        <div className="panel placeholder-panel">
          <h3>Most common skill gaps</h3>
          <p>Chart will appear here once enough report data is available.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;