import styled from 'styled-components';

export const Table = styled.table`
    font-size: 1em;
    font-weight: normal;
    width: auto;
    border-collapse: collapse;  
`;

export const Th = styled.th`
    border: 1px solid black;
    text-align: center;
    background: #1D7991;
    color: white;
    padding: 0;
    margin: 0;
`;

export const Td_hour = styled.td`
    border: 1px solid black;
    text-align: center;
    vertical-align: top;
    background: #1D7991;
    color: white;
    padding: 0;
    margin: 0;
`;

export const Td = styled.td`
    height: auto;
    border: 1px solid black;
    text-align: left;
    padding: 0;
    margin: 0;
`;

export const Tr = styled.tr`
  background: #dafdff;

  :nth-child(1) {
    background: white;
  }

  :nth-child(even) {
    background: #e0ffec;
  }
`;

export const Table_internal = styled.table`
    width: auto;
    border-collapse: collapse;  
`;

export const Tr_internal = styled.tr`
  border-top: 1px solid #949494;
  border-bottom: 1px solid #949494;
  padding: 0;
  margin: 0;

  :nth-child(1) {
    border: none;
  }

  :nth-last-child(1) {
    border: none;
  }
`;

export const Td_internal = styled.td`
  padding: 0;
  margin: 0;
`;
