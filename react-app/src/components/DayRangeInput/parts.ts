import styled from 'styled-components';
import * as C from '../../utils/colors'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    label {
        margin: 0 12px;
    }
`;

export const Select = styled.select`
    font-size: 16px;
    margin: 8px 0;
`;

export const RemoveButton = styled.button`
    border-radius: 5px;
    border: none;
    background: ${C.blue};
    color: white;
    font-weight: bold;
    padding: 5px;
`;
