import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Button = styled.button<{ isCurrentPage?: boolean }>`
    width: 50px;
    height: 50px;

    background-color: white;
    color: blue;

    font-size: 24px;

    ${({ isCurrentPage }) => isCurrentPage && 'background-color: gray;'}

    margin: 0 4px;
`;

export const Input = styled.input`
    width: 46px;
    height: 46px;

    background-color: white;
    color: blue;

    font-size: 24px;

    padding: 0;

    text-align: center;

    margin: 0 4px;
`;