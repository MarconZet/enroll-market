import { useState } from 'react';
import * as P from './parts';

export interface PaginationProps {
    onPageChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ onPageChange, currentPage, totalPages }) => {
    const [input, setInput] = useState<number>();

    return (
        <P.Wrapper>
            <P.Button isCurrentPage={currentPage === 1} onClick={(e) => onPageChange(1)}>1</P.Button>

            {(totalPages > 3) && (currentPage > 2) && (<P.Input value={input} placeholder="..." />)}

            {(totalPages > 3) && (currentPage > 2) && (<P.Button onClick={(e) => onPageChange(currentPage-1)}>{currentPage-1}</P.Button>)}

            {(totalPages > 2) && (currentPage > 1) && (currentPage < totalPages) && (<P.Button isCurrentPage>{currentPage}</P.Button>)}

            {(totalPages > 2) && (currentPage < totalPages-1) && (<P.Button onClick={(e) => onPageChange(currentPage+1)}>{currentPage+1}</P.Button>)}

            {(totalPages > 3) && (currentPage < totalPages-1) && (<P.Input value={input} placeholder="..." />)}

            {(totalPages > 1) && (<P.Button isCurrentPage={currentPage === totalPages} onClick={(e) => onPageChange(totalPages)}>{totalPages}</P.Button>)}
        </P.Wrapper>
    );
};

