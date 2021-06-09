import styled from 'styled-components';
import * as C from '../../utils/colors'

export const Download = styled.button`
    padding: 16px 48px;
    margin: 16px auto;
    font-size: 24px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    border: none;
    background: ${C.blue};
    color: white;
    font-weight: bold;

    :hover{
      cursor: pointer;
    }

    :disabled {
        background: gray;
    }
`;
