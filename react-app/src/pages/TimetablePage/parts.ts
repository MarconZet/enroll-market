import styled from 'styled-components';

export const Wrapper = styled.div`
    font-size: 0.8em;
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

export const Course = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: dimgrey;
  opacity: 0.9;
  border-radius: 2px;
  box-shadow: 0 0 2px darkslategrey;
`;

export const Time = styled.p`
    margin: 0;
    padding: 3px 5px;
    color: white;
    background: darkslategrey;
`;

export const Subject = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  margin: 0;
  padding: 5px;
  color: white;
`;

export const Teacher = styled.p`
  margin: 0;
  padding: 5px;
  color: white;
`;

export const Download = styled.button`
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

    :disabled {
        background: gray;
    }
`;