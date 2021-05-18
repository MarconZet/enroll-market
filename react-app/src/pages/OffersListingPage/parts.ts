import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
  
    padding: 40px 100px 0 100px;
`;

export const OffersContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    padding: 0 20px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 400px;

    padding: 0 10px;
`;

export const TypeContainer = styled.div`
    box-shadow: 0 0 5px 1px #B2B3B2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 16px;

    * {
        width: 100%;
    }
`;

export const TypeButton = styled.div<{ isCurrent?: boolean }>`
    font-size: 1.2em;
    padding: 0;
    margin: 10px;
    color: black;
    font-weight: bold;
    text-align: center;

    ${({ isCurrent }) => isCurrent && 'color: #de3770'}
`;
