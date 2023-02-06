import React, { useEffect } from "react";

import {
    PopupStyled,
    PopupContainer,
    PopupCloseButton,
    PopupIcon,
    PopupDescription,
} from './styled';

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
    
    return (
        <PopupStyled onClick={onClose} opened={isOpen} >
            <PopupContainer onClick={handleOverlay}>
                <PopupCloseButton
                    type="button"
                    onClick={onClose}
                ></PopupCloseButton>
                <PopupIcon
                    src={isSuccess ? successIco : notSuccessIco}
                    alt={
                        isSuccess 
                        ? "Иконка - всё успешно" 
                        : "Иконка - что-то пошло не так"
                    }
                />
                <PopupDescription>
                    {text}
                </PopupDescription>
            </PopupContainer>
        </PopupStyled>
    );
}
