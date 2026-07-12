const ScoreTrendChart = ({ points }) => {
    if (!points?.length) return null;

    const W = 480;
    const H = 120;
    const PAD = 16;

    const scores = points.map((p) => p.matchScore);
    const min = Math.max(0, Math.min(...scores) - 10);
    const max = Math.min(100, Math.max(...scores) + 10);

    const x = (i) => PAD + (i / (points.length - 1)) * (W - PAD * 2);
    const y = (v) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);

    const pathD = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.matchScore)}`)
        .join(" ");

    const areaD = `${pathD} L ${x(points.length - 1)} ${H - PAD} L ${x(0)} ${H - PAD} Z`;

    return (
        <div className="trend-chart-wrap">
            <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="trend-svg"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--primary-light)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={areaD} fill="url(#trendGrad)" />
                <path
                    d={pathD}
                    fill="none"
                    stroke="var(--primary-light)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {points.map((p, i) => (
                    <g key={i}>
                        <circle cx={x(i)} cy={y(p.matchScore)} r="4" fill="var(--primary-light)" />
                        <title>{p.role} — {p.matchScore}%</title>
                    </g>
                ))}
            </svg>

            <div className="trend-labels">
                {points.map((p, i) => (
                    <span key={i}>{p.date}</span>
                ))}
            </div>
        </div>
    );
};

export default ScoreTrendChart;