import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const PagePartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 600px;

    padding: 24px;
    margin: 8px;

    border: 1px solid black;
`;

export const Download = styled.a`
    padding: 16px 48px;
    margin-top: 16px;
    font-size: 24px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    display: block;
`;

export const Input = styled.input`
    ::-webkit-file-upload-button {
        content: 'Wybierz plik';
        font-size: 16px;
        padding: 8px;
    }

    font-size: 16px;
    border: 1px solid black;
`;

export const Submit = styled.button`
    padding: 16px 48px;
    margin-top: 16px;
    margin-left: 8px;
    font-size: 24px;
    border: 1px solid black;
`;