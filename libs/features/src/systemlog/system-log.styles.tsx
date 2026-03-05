import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 64px);
  background-color: #f8f9fa;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

export const StatusPill = styled.div<{
  $status: string;
  children?: React.ReactNode;
}>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  display: inline-block;
  min-width: 60px;
  text-align: center;
  background-color: ${(props) =>
    props.$status.toLowerCase() === 'ok'
      ? '#2e7d32'
      : props.$status.toLowerCase() === 'error'
        ? '#d32f2f'
        : '#ed6c02'};
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 12px;
`;

export const StyledDataGridContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  overflow: hidden;

  /* Custom styling for MUI DataGrid */
  .MuiDataGrid-root {
    border: none;
    font-family:
      'Inter',
      -apple-system,
      sans-serif;
  }

  .MuiDataGrid-columnHeaders {
    background-color: #fefefe;
    border-bottom: 2px solid #e0e0e0;
    color: #4a4a4a;
    font-weight: 600;
    font-size: 13px;
  }

  /* Remove default padding from header cells so custom component can span 100% width */
  .MuiDataGrid-columnHeader {
    padding: 0 !important;
  }

  /* Override the default header title container to fill space */
  .MuiDataGrid-columnHeaderTitleContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 0 !important;
  }

  .MuiDataGrid-columnHeaderTitleContainerContent {
    flex: 1;
    display: flex;
    width: 100%;
  }

  .MuiDataGrid-columnHeaderTitle {
    font-weight: 600;
  }

  /* Position Sort and Menu icons correctly on the top 'row' of the header */
  .MuiDataGrid-iconButtonContainer {
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 10;
  }

  .MuiDataGrid-menuIcon {
    position: absolute;
    right: 28px;
    top: 8px;
    z-index: 10;
  }

  /* Remove default outline when focused */
  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-columnHeader:focus-within {
    outline: none;
  }

  .MuiDataGrid-row {
    cursor: pointer;
  }

  .MuiDataGrid-row:hover {
    background-color: #f4f6f8;
  }

  .MuiDataGrid-cell {
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    color: #333;
    display: flex;
    align-items: center;
  }

  .MuiDataGrid-footerContainer {
    border-top: 1px solid #e0e0e0;
    background-color: #fefefe;
  }
`;
