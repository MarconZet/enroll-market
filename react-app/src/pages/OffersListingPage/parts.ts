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

    width: 300px;

    padding: 0 10px;
`;

export const TypeContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 8px;

    * {
        width: 100%;
    }
`;

export const TypeButton = styled.button<{ isCurrent?: boolean }>`
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    margin: 8px 0;
    font-size: 16px;

    ${({ isCurrent }) => isCurrent && 'background-color: royalblue'}
`;
