import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 40px 100px 0 100px;
`;

export const Form = styled.form`
    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 1200px;
    margin-top: 8px;
`;

export const Select = styled.select`
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
`;

export const Submit = styled.button`
    padding: 12px 36px;
    margin-top: 8px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background: #de3770;
    color: white;
    font-weight: bold;

    :hover{
      cursor: pointer;
    }

    :disabled {
        background-color: gray;
        cursor: not-allowed;
    }
`;

export const Title = styled.p`
    font-size: 32px;
    padding: 0;
    margin: 0 0 20px 0;
`