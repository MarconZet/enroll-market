import styled from 'styled-components';

export const Wrapper = styled.div`
    font-size: 0.8em;
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

export const Time = styled.p`
    margin: 0;
    padding: 3px 5px;
    color: white;
    background: darkslategrey;
`;

export const TimePlaceholder = styled.p`
    margin: 0;
    padding: 0;
    background: darkslategrey;
    height: 12px;
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

export const Course = styled.div<{ noCourses: number }>`
  position: absolute;
  top: 0;
  left: 0;
  background: dimgrey;
  opacity: 0.9;
  border-radius: 2px;
  box-shadow: 0 0 2px darkslategrey;
  overflow-wrap: break-word;
  hyphens: manual;
  overflow: hidden;

  ${TimePlaceholder} {
    ${({ noCourses }) => noCourses <= 5 && 'display: none'}
  }
  
  ${Time} {
    ${({ noCourses }) => noCourses > 5 && 'visibility: hidden'}
  }
  
  ${Subject} {
    ${({ noCourses }) => noCourses > 4 && 'visibility: hidden'}
  }
  
  ${Teacher} {
    ${({ noCourses }) => noCourses > 3 && 'visibility: hidden'}
  }

  :hover{
    cursor: pointer;
    font-size: 1.2em;
    min-width: 211px;
    min-height: 211px;
    opacity: 1;
    z-index: 100;

    ${TimePlaceholder} {
      display: none;
    }
    
    ${Time}, ${Subject}, ${Teacher} {
      visibility: visible;
    }

    box-shadow: 0 0 25px 10px darkslategrey;
    border-radius: 5px;
  }
`;

export const FiltersWrapper = styled.div`
  margin: 0;
  padding: 0;
  justify-content: center;
`;
