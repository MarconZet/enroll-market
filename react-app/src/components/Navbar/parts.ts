import styled from 'styled-components';

export const Navbar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 4px;
    border-bottom: 1px solid black;
`;

export const SelectSemester = styled.select`
    width: 40%;
    height: 64px;

    font-size: 20px;

    text-align: center;
`;

export const Link = styled.button<{ isCurrent?: boolean }>`
    font-size: 20px;
    padding: 20px 30px;

    ${({ isCurrent }) => isCurrent && 'background-color: royalblue'}
`;