import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid black;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
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

export const ButtonsBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border-top: 1px solid black;
`;

export const Button = styled.button`
    padding: 12px 36px;
    margin: 0 16px;
    font-size: 16px;
`;