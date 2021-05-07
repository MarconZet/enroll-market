import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 40px 100px 0 100px;
`;

export const PagePartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    padding: 24px;
    margin: 8px;

    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
`;

export const ContainerTitle = styled.p`
    font-size: 32px;
    padding: 0;
    margin: 0 0 20px 0;
`;

export const Download = styled.a`
    padding: 16px 48px;
    margin-top: 16px;
    font-size: 24px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    border: none;
    background: #de3770;
    color: white;
    font-weight: bold;

    :hover{
      cursor: pointer;
    }
`;

export const Input = styled.input`
    ::-webkit-file-upload-button {
        content: 'Wybierz plik';
        cursor: pointer;
        font-size: 16px;
        padding: 8px;
    }

    font-size: 16px;
    box-shadow: 0 0 5px 1px #B2B3B2;
`;

export const Submit = styled.button`
    padding: 16px 48px;
    margin-top: 16px;
    margin-left: 8px;
    font-size: 24px;
    border-radius: 5px;
    border: none;
    background: #de3770;
    color: white;
    font-weight: bold;

    :hover{
      cursor: pointer;
    }
`;