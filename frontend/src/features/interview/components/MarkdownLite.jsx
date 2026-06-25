const parseInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
};

const MarkdownLite = ({ text = "" }) => {
  const lines = text.split("\n");
  const blocks = [];
  let buffer = [];
  let bufferType = null;

  const flush = () => {
    if (!buffer.length) return;
    const Tag = bufferType === "ol" ? "ol" : "ul";
    blocks.push(
      <Tag key={`list-${blocks.length}`}>
        {buffer.map((item, i) => <li key={i}>{parseInline(item)}</li>)}
      </Tag>
    );
    buffer = [];
    bufferType = null;
  };

  lines.forEach((rawLine, i) => {
    const line = rawLine.trim();
    if (!line) { flush(); return; }

    const orderedMatch = line.match(/^\d+\.\s+(.*)/);
    const unorderedMatch = line.match(/^-\s+(.*)/);

    if (line.startsWith("### ")) {
      flush();
      blocks.push(<h4 key={i}>{line.replace("### ", "")}</h4>);
    } else if (orderedMatch) {
      if (bufferType !== "ol") flush();
      bufferType = "ol";
      buffer.push(orderedMatch[1]);
    } else if (unorderedMatch) {
      if (bufferType !== "ul") flush();
      bufferType = "ul";
      buffer.push(unorderedMatch[1]);
    } else {
      flush();
      blocks.push(<p key={i}>{parseInline(line)}</p>);
    }
  });

  flush();
  return <div className="markdown-lite">{blocks}</div>;
};

export default MarkdownLite;