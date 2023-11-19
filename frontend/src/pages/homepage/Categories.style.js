import styled from 'styled-components';

export const CategoriesWrap = styled.div`
    display: flex;
    alignItems: 'end',
    marginBottom: '20px',  
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
  background: ${({ isSelected }) => isSelected ? "#449ae9" : "white"};
  color: ${({ isSelected }) => isSelected ? "#ffffff" : "#000000"};
`;