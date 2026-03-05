import styled from 'styled-components';

export const SidebarWrap = styled.div<{
  $width: number;
  children?: React.ReactNode;
}>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: #f7f9fc;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  transition: width 0.1s ease;
  z-index: 100;
`;

export const ColIcons = styled.div`
  width: 64px;
  min-width: 64px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  align-items: center;
  overflow-y: auto;
`;

export const IconButton = styled.button<
  {
    $active?: boolean;
    children?: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: ${(props) => (props.$active ? '#e3f2fd' : 'transparent')};
  color: ${(props) => (props.$active ? '#1976d2' : '#555')};
  border: none;
  width: 56px;
  height: 56px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f4f8;
    color: #1976d2;
  }
`;

export const ColContent = styled.div<{ children?: React.ReactNode }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: #fcfcfc;
`;

export const TabRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
`;

export const TabButton = styled.button<
  {
    $active?: boolean;
    children?: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  color: ${(props) => (props.$active ? '#1976d2' : '#666')};
  border-bottom: 2px solid
    ${(props) => (props.$active ? '#1976d2' : 'transparent')};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

export const ContentArea = styled.div<{ children?: React.ReactNode }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const IconRow = styled.div<{ children?: React.ReactNode }>`
  display: flex;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  align-items: center;
  background: #fff;
`;

export const ActionIcon = styled.button<
  {
    children?: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

export const IconDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #ddd;
  margin: 0 8px;
`;

export const SearchContainer = styled.div<{ children?: React.ReactNode }>`
  padding: 12px 16px;
`;

export const SidebarSearchWrapper = styled.div<{
  children?: React.ReactNode;
}>`
  position: relative;
  display: flex;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SearchInputClean = styled.input<
  {
    children?: React.ReactNode;
  } & React.InputHTMLAttributes<HTMLInputElement>
>`
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 4px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

export const SearchIconRight = styled.div<{ children?: React.ReactNode }>`
  padding: 8px 12px;
  color: #999;
  display: flex;
  align-items: center;
`;

export const TreeContainer = styled.div<{ children?: React.ReactNode }>`
  padding: 8px 16px;
  flex: 1;
  overflow-y: auto;
`;

export const Resizer = styled.div<
  {
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
>`
  width: 8px;
  cursor: col-resize;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 10;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const ResizerHandle = styled.div<{
  children?: React.ReactNode;
}>`
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    width: 2px;
    height: 16px;
    background-color: #bbb;
    border-radius: 2px;
  }
`;
