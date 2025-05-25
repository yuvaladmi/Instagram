import React from "react";

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* <div className="modal-content" onClick={(e) => e.stopPropagation()}> */}
                {children}
            {/* </div> */}
        </div>
    );
}
