import React from 'react';
import './dropdownTicker.css'; // Add some basic styling for the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ minHeight : '350px', minWidth : '350px'}}>
      <div className="modal-content" style={{ minHeight : '350px', minWidth : '350px'}}>
        <button onClick={onClose} className="drop-close-button" style={{ fontSize : '0.8rem' }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
