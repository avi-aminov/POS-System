import styled from 'styled-components';

export const CategoriesWrap = styled.div`
    display: flex;
    padding-bottom: 20px; 
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
        justify-content: center;
        display: flex;
        text-align: center;
        margin: 10px 10px;
        min-width: 65px;
        align-items: initial;
    }

    img{
        width: 80px;
        max-width: 40px;
        object-fit: contain;
    }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  //background: ${({ isSelectedCategory }) => isSelectedCategory ? "#1677ff" : "white"};
  color: ${({ isSelectedCategory }) => isSelectedCategory ? "#1677ff" : "#000000"};
  margin: 0 8px;
  border: 2px solid ${({ isSelectedCategory }) => isSelectedCategory ? "#1677ff" : "#000000"};;
`;