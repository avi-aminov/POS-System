import styled from 'styled-components';

export const CategoriesWrap = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px; 
    max-width: 100%;
    overflow: auto;
     
`;

export const CategoriesItem = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    h4{
        font-size: 16px;
    }

    img{
        width: 80px;
    }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;
  background: ${({ isSelected }) => isSelected ? "#1677ff" : "white"};
  color: ${({ isSelected }) => isSelected ? "#ffffff" : "#000000"};
`;