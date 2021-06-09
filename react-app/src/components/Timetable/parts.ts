import styled from 'styled-components';
import * as C from '../../utils/colors';

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
  transition: 0.2s ease;

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
    min-width: 250px;
    min-height: 200px;
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
  margin: 20px 0 0 0;
  padding: 0;
  width: 80%;
  box-shadow: 0 0 2px darkslategrey;
  border-radius: 4px;
  justify-self: center;
  align-self: center;
`;

export const FiltersButton = styled.button`
  justify-self: center;
  align-self: center;
  margin: 20px 0 0 0;
  padding: 0;
  width: 200px;
  height: 30px;
  border: none;
  color: white;
  font-weight: bold;
  background: ${C.blue};
  border-radius: 4px;

  :hover{
    cursor: pointer;
  }
`

export const FiltersForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TypeLabel = styled.label`
  margin: 1px;
  padding: 0;
`

export const TypesPrompt = styled.h4`
  margin: 0 0 5px 0;
  padding: 0;
`
export const SelectTeacher = styled.select`
  margin: 10px 0 0 0;
  padding: 0;
  width: 200px;
`

export const SelectSubject = styled.select`
  margin: 10px 0 0 0;
  padding: 0;
  width: 200px;
`

export const ApplyFilters = styled.input`
  margin: 10px 0 0 0;
  padding: 0;
  width: 200px;
  height: 30px;
  border: none;
  color: white;
  font-weight: bold;
  background: ${C.blue};
  border-radius: 4px;
  
  :hover{
    cursor: pointer;
  }
`

export const ClearFilters = styled.button`
  margin: 10px 0;
  padding: 0;
  width: 200px;
  height: 30px;
  border: none;
  color: white;
  font-weight: bold;
  background: darkred;
  border-radius: 4px;

  :hover {
    cursor: pointer;
  }
`
