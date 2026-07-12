import { useState } from "react";

const ExpandableText = ({ text = "" }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="expandable-text">
      <p className={`expandable-body ${expanded ? "expanded" : ""}`}>{text}</p>
      <button
        className="expandable-toggle"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "View less" : "... View more"}
      </button>
    </div>
  );
};

export default ExpandableText;
