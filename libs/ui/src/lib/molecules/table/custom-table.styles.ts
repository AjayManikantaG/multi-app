import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 4px 4px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  height: 24px;
  /* Allow space for the default DataGrid sort icon */
  padding-right: 24px;
`;

export const FilterRow = styled.div`
  margin-top: 6px;
  width: 100%;

  select {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #1976d2;
    }
  }
`;
