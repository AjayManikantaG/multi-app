import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  height: 48px;
  width: 100%;
  background-color: #f3f3f3;
  border-bottom: 0.5px solid #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-sizing: border-box;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #333;

  span {
    color: #cb2027; /* VIRTIMO color */
  }
`;

export const Breadcrumb = styled.div`
  font-size: 13px;
  color: #666;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  b {
    color: #333;
    font-weight: 600;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #555;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #d3d3d3;
  margin: 0 4px;
`;
