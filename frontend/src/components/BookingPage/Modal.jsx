import React from 'react';
import './Modal.css';

function Modal({ show, onClose, onConfirm, isCancelMode }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content slide-down">
                <div className="modal-buttons">
                    {isCancelMode ? (
                        <>
                            <button className="btn primary" onClick={onConfirm}>Отменить бронь</button>
                        </>
                    ) : (
                        <>
                            <button className="btn primary" onClick={onConfirm}>Закрепить запись за собой</button>
                        </>
                    )}
                    <button className="btn cancel" onClick={onClose}>Отменить выбор</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;