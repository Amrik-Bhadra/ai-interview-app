import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "../icons";
import "./modal.css";

/**
 * Generic Modal — renders into document.body via a portal so it always
 * sits on top of everything regardless of stacking context.
 *
 * Props:
 *   isOpen       boolean          — controls visibility
 *   onClose      () => void       — called on backdrop click, Escape, or ✕ button
 *   title        string           — modal heading
 *   description  string?          — optional subtitle / body text
 *   size         "sm"|"md"|"lg"   — default "md"
 *   hideClose    boolean?         — hide the ✕ button (useful for required confirmations)
 *   children     ReactNode        — custom body content (replaces description when provided)
 *   footer       ReactNode        — action buttons row
 *
 * Usage examples:
 *
 * // Confirmation
 * <Modal
 *   isOpen={showLogout}
 *   onClose={() => setShowLogout(false)}
 *   title="Log out?"
 *   description="You'll need to sign in again to access your reports."
 *   footer={
 *     <>
 *       <button className="button ghost-button" onClick={() => setShowLogout(false)}>Cancel</button>
 *       <button className="button danger-button" onClick={handleLogout}>Log out</button>
 *     </>
 *   }
 * />
 *
 * // Custom content
 * <Modal isOpen={open} onClose={close} title="Edit profile" size="lg">
 *   <MyForm />
 * </Modal>
 */

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  hideClose = false,
  children,
  footer,
}) => {
  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className={`modal-box modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          {!hideClose && (
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <XIcon />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          {children ?? (
            description && <p className="modal-description">{description}</p>
          )}
        </div>

        {/* Footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;