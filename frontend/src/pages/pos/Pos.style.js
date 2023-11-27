import styled from 'styled-components';

export const CategoriesAndProductSearchWrap = styled.div`
    padding: 10px 0; 
    position: sticky;
    top: 0;
    z-index: 99;
    background: #ffffff;   
`;

export const ProductWrap = styled.div`
    max-width: 60%;
    width: 900px;

    .ant-row{
        gap: 1%;

        .ant-col{
            max-width: 24%;
        }
    }

    @media (max-width: 900px) {
        width: 100%;
        max-width: 100%;
    }
`;