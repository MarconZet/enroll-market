import styled from 'styled-components';

export const Form = styled.form`
    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 1200px;
    margin: auto;
    background-color: white;
`;

export const ButtonsBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid black;
`;

export const Button = styled.button<{ isNegative?: boolean }>`
    padding: 12px 36px;
    margin: 0 16px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background: #de3770;
    color: white;
    font-weight: bold;
  
    :hover{
      cursor: pointer;
    }

    ${
        ({ isNegative }) => isNegative
            ? `
                border: 1px solid #de3770;
                color: #de3770;
                background: white
            ` : `
                background: #de3770;
                color: white;
            `
    }
`;

export const SubjectName = styled.span`
    font-size: 32px;
    margin-bottom: 20px;
`;