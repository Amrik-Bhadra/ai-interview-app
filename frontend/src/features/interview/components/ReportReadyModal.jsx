import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal/Modal.jsx";
import ScoreGauge from "./ScoreGauge";

const severityOrder = { high: 0, medium: 1, low: 2 };

const ReportReadyModal = ({ report, onClose }) => {
    const navigate = useNavigate();

    if (!report) return null;

    const topGaps = [...(report.skillGaps ?? [])]
        .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
        .slice(0, 3);

    const handleView = () => {
        onClose();
        navigate(`/reports/${report._id}`);
    };

    return (
        <Modal
            isOpen={!!report}
            onClose={onClose}
            title="Your report is ready 🎉"
            size="md"
            hideClose={false}
            footer={
                <>
                    <button className="button ghost-button" onClick={onClose}>
                        Stay here
                    </button>
                    <button className="button primary-button" onClick={handleView}>
                        View full report →
                    </button>
                </>
            }
        >
            <div className="report-ready-body">

                {/* Score + Role */}
                <div className="report-ready-hero">
                    <ScoreGauge score={report.matchScore} size={110} />
                    <div className="report-ready-meta">
                        <p className="ready-label">Role</p>
                        <h3>{report.role}</h3>
                        <p className="ready-counts">
                            <span>{report.technicalQuestions?.length ?? 0} technical</span>
                            <span className="dot-sep">·</span>
                            <span>{report.behavioralQuestions?.length ?? 0} behavioral</span>
                            <span className="dot-sep">·</span>
                            <span>{report.preparationPlan?.length ?? 0}-day prep plan</span>
                        </p>
                    </div>
                </div>

                {/* Top skill gaps */}
                {topGaps.length > 0 && (
                    <div className="report-ready-gaps">
                        <p className="ready-label">Top skill gaps identified</p>
                        <div className="ready-gap-list">
                            {topGaps.map((gap) => (
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

            </div>
        </Modal>
    );
};

export default ReportReadyModal;