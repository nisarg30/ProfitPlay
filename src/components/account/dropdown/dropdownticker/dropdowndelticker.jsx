import React from 'react';
import './dropdownTicker.css'; // Add some basic styling for the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay2">
      <div className="modal-content2">
        <button onClick={onClose} className="drop-close-button2" style={{ fontSize : '0.8rem' }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
