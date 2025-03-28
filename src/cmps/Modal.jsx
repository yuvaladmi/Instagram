import React from "react";

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children} {/* Content from the parent component */}
                {/* <button className="close-btn" onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
}
