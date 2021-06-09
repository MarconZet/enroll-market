import styled from 'styled-components';
import * as C from '../../utils/colors'

export const Container = styled.form`
    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const Button = styled.button`
    padding: 12px 36px;
    margin-top: 8px;
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

export const CheckboxesHeader = styled.span`
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
`;
