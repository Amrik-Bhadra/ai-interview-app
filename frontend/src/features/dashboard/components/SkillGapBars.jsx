const severityOrder = { high: 0, medium: 1, low: 2 };

const SkillGapBar = ({ skill, count, severity, max }) => (
    <div className="gap-bar-row">
        <span className="gap-bar-label">{skill}</span>
        <div className="gap-bar-track">
            <div
                className={`gap-bar-fill ${severity}`}
                style={{ width: `${(count / max) * 100}%` }}
            />
        </div>
        <span className="gap-bar-count">{count}</span>
    </div>
);

const SkillGapBars = ({ gaps }) => {
    if (!gaps?.length) return <p className="panel-hint">No skill gaps recorded yet.</p>;

    const max = Math.max(...gaps.map((g) => g.count));

    // Sort by severity first (high → medium → low), then by count descending
    const sorted = [...gaps].sort((a, b) => {
        const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
        return severityDiff !== 0 ? severityDiff : b.count - a.count;
    });

    return (
        <div className="gap-bars">
            {sorted.map((g) => (
                <SkillGapBar key={g.skill} {...g} max={max} />
            ))}
        </div>
    );
};

export default SkillGapBars;