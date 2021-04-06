import styled from 'styled-components';

export const Container = styled.form`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const Submit = styled.button`
    padding: 12px 36px;
    margin-top: 8px;
    font-size: 16px;
    border: 1px solid black;
`;

export const Title = styled.div`
    font-size: 32px;
    border-bottom: 1px solid black;
    width: 100%;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 8px;
`;

export const Select = styled.select`
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
`;