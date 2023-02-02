import React, { useEffect } from "react";

import './Popup.css';
import successIco from "../../images/InfoPopupWork.svg";
import notSuccessIco from "../../images/InfoPopupDon'tWork.svg";

export const Popup = ({ isOpen, onClose, text, isSuccess }) => {

    useEffect(() => {
        if (!isOpen) return;

        const closeByEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", closeByEscape);
        return () => document.removeEventListener("keydown", closeByEscape);
    }, [isOpen, onClose]);

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {   
            onClose();
        }
    };

    const openPopup = `popup ${isOpen && 'popup_opened'}`;
    
    return (
        <div className={openPopup} onClick={onClose} >
            <div className="popup__container" onClick={handleOverlay}>
                <button
                    type="button"
                    className="popup__close-icon"
                    onClick={onClose}
                ></button>
                <img
                    className="popup__icon"
                    src={isSuccess ? successIco : notSuccessIco}
                    alt={
                        isSuccess 
                        ? "Иконка - всё успешно" 
                        : "Иконка - что-то пошло не так"
                    }
                />
                <h3 className="popup__description">
                    {text}
                </h3>
            </div>
        </div>
    );
}
