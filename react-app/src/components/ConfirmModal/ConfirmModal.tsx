import React from 'react';
import ReactModal from 'react-modal';
import * as P from './parts';

export interface ConfirmModalProps {
    confirmHandler: () => void;
    cancelHandler: () => void;
    confirmationText: string;
    isOpen: boolean;
}

export const OneForOneEditModal: React.FC<ConfirmModalProps> = ({ confirmHandler, cancelHandler, isOpen, confirmationText }) => { 
    const style = {
        content: {
            padding: '40px 100px 0 100px',
            border: 'none',
            background: 'transparent',
        }
    }

    return (
        <ReactModal isOpen={isOpen} style={style}>
            <P.Wrapper>
                <P.Text>{confirmationText}</P.Text>
                <P.ButtonsBox>
                    <P.Button onClick={confirmHandler}>Potwierdź</P.Button>
                    <P.Button isNegative onClick={cancelHandler}>Anuluj</P.Button>
                </P.ButtonsBox>
            </P.Wrapper>
        </ReactModal>
    );
};

export default OneForOneEditModal;