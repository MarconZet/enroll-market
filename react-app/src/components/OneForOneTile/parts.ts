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

export const OffersBox = styled.div<{ reverseOrder?: boolean }>`
    display: flex;
    justify-content: space-around;
    width: 100%;

    ${({ reverseOrder }) => reverseOrder ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
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
    ${({ isOffered }) => isOffered ? 'background-color: aquamarine;' : 'background-color: khaki;'}

    span, b {
        font-size: 16px;
        display: inline-block;
        margin: 2px 0;
    }
`;

export const ButtonsBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid black;
`;

export const Button = styled.button`
    padding: 12px 36px;
    margin: 0 16px;
    font-size: 16px;
`;

export const SVGBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;