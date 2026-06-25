import { useState } from "react";
import { ChevronDownIcon } from "../components/icons";
import MarkdownLite from "./MarkdownLite";

const QuestionAccordion = ({ index, question, intention, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`question-card ${open ? "open" : ""}`}>
      <button className="question-header" onClick={() => setOpen((v) => !v)}>
        <span className="question-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="question-text">{question}</span>
        <ChevronDownIcon className="chevron" />
      </button>

      {open && (
        <div className="question-body">
          <div className="intention-block">
            <p className="block-label">Why this is asked</p>
            <p>{intention}</p>
          </div>
          <div className="answer-block">
            <p className="block-label">How to answer</p>
            <MarkdownLite text={answer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAccordion;