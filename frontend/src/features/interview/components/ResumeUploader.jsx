import { useRef, useState } from "react";
import { UploadCloudIcon, FileIcon, XIcon } from "../components/icons.jsx";

const formatSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
};

const ResumeUploader = ({ file, onFileSelect, onRemove }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileSelect(dropped);
  };

  if (file) {
    return (
      <div className="resume-uploader has-file">
        <FileIcon className="file-icon" />
        <div className="file-meta">
          <p className="file-name">{file.name}</p>
          <p className="file-size">{formatSize(file.size)}</p>
        </div>
        <button type="button" className="remove-file" onClick={onRemove} aria-label="Remove file">
          <XIcon />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`resume-uploader ${isDragging ? "dragging" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
    >
      <UploadCloudIcon className="upload-icon" />
      <p className="upload-text"><span>Click to upload</span> or drag and drop your resume</p>
      <p className="upload-hint">PDF, up to 5MB</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
      />
    </div>
  );
};

export default ResumeUploader;