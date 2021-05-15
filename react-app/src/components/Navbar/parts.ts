import styled from 'styled-components';

export const Navbar = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    padding: 20px 0;
    box-shadow: 0 0 8px 1px #B2B3B2;
`;

export const SelectSemester = styled.select`
    width: 40%;
    height: 64px;

    font-size: 20px;

    text-align: center;
`;

export const Link = styled.span<{ isCurrent?: boolean }>`
    font-size: 1.2em;
    padding: 0;
    margin: 10px;
    color: black;
    font-weight: bold;

    ${({ isCurrent }) => isCurrent && 'color: #de3770'}
`;

export const UserName = styled.span`
    font-size: 1.2em;
    padding: 0;
    margin-left: 10px;
    color: black;
    font-weight: bold;
`;