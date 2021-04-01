import { useState } from 'react';
import * as P from './parts';

export interface PaginationProps {
    onPageChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ onPageChange, currentPage, totalPages }) => {
    const [leftInput, setLeftInput] = useState<number | string>('');
    const [rightInput, setRightInput] = useState<number | string>('');

    const onChange = (setter: (arg: number | string) => void): React.ChangeEventHandler<HTMLInputElement> => (event) => {
        const toNumber = +event.target.value
        if (!isNaN(toNumber) && toNumber > 0) {
            setter(toNumber);
            return;
        }

        setter('');
    }

    const onBlur = (setter: (arg: number | string) => void, input: number | string): React.FocusEventHandler<HTMLInputElement> => (event) => {
        if (typeof input === 'number' && input <= totalPages && input >= 1) {
            onPageChange(input);
        }

        setter('');
    }

    return (
        <P.Wrapper>
            <P.Button isCurrentPage={currentPage === 1} onClick={(e) => onPageChange(1)}>1</P.Button>

            {(totalPages > 3) && (currentPage > 2) && (<P.Input onChange={onChange(setLeftInput)} onBlur={onBlur(setLeftInput, leftInput)} value={leftInput} placeholder="..." />)}

            {(totalPages > 3) && (currentPage > 2) && (<P.Button onClick={(e) => onPageChange(currentPage-1)}>{currentPage-1}</P.Button>)}

            {(totalPages > 2) && (currentPage > 1) && (currentPage < totalPages) && (<P.Button isCurrentPage>{currentPage}</P.Button>)}

            {(totalPages > 2) && (currentPage < totalPages-1) && (<P.Button onClick={(e) => onPageChange(currentPage+1)}>{currentPage+1}</P.Button>)}

            {(totalPages > 3) && (currentPage < totalPages-1) && (<P.Input onChange={onChange(setRightInput)} onBlur={onBlur(setRightInput, rightInput)} value={rightInput} placeholder="..." />)}

            {(totalPages > 1) && (<P.Button isCurrentPage={currentPage === totalPages} onClick={(e) => onPageChange(totalPages)}>{totalPages}</P.Button>)}
        </P.Wrapper>
    );
};

