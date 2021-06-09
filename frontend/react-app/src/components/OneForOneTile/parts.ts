import styled from 'styled-components';
import * as C from '../../utils/colors'

export const Container = styled.div<{ isAcceptable?: boolean }>`
    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    ${({ isAcceptable }) => isAcceptable ? 'background-color: white' : 'background-color: silver'}
`;

export const SubjectName = styled.span`
    font-size: 32px;
    margin-bottom: 20px;
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

export const Subheader = styled.span<{ isOffered?: boolean }>`
    font-size: 24px;
    ${({ isOffered }) => isOffered ? 'color: #1D7991;' : 'color: #91163F;'}
`;

export const ClassBox = styled.div<{ isOffered?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    height: 150px;
    width: 300px;
    border-radius: 5px;  
  
    ${({ isOffered }) => isOffered ? 'background-color: #1D7991;' : 'background-color: #91163F;'}

    span, b {
        font-size: 16px;
        display: inline-block;
        margin: 2px 0;
        color: white;
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
    border-radius: 5px;
    border: none;
    background: ${C.blue};
    color: white;
    font-weight: bold;
  
    :hover{
      cursor: pointer;
    }
`;

export const SVGBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 40%;
    margin: 30px -10px 0 0;
`;
