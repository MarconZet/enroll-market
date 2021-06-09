import styled from 'styled-components';
import * as C from '../../utils/colors'

export const Select = styled.select`
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
`;

export const RangesHeader = styled.span`
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
`;

export const AddBlockButton = styled.button`
    border-radius: 5px;
    border: none;
    background: ${C.blue};
    color: white;
    font-weight: bold;
    padding: 5px;
`;

export const Input = styled.input`
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
`;
