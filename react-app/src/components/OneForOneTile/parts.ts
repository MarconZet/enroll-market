import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid black;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SubjectName = styled.span`
    font-size: 32px;
    font-weight: bold;
`;

export const OffersBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

export const SlotBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Subheader = styled.span`
    font-size: 24px;
`;

export const ClassBox = styled.div<{ isOffered?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    height: 100px;
    width: 300px;
    ${({ isOffered }) => isOffered ? 'background-color: green;' : 'background-color: yellow;'}

    span {
        font-size: 16px;
    }
`;