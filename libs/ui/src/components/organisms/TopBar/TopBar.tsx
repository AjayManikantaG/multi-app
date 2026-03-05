import React from 'react';
import { AppBar, Toolbar, AppBarProps } from '@mui/material';

export interface TopBarProps extends AppBarProps {
  rootContent?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  rootContent,
  children,
  ...props
}) => {
  return (
    <AppBar position="static" {...props}>
      <Toolbar>
        {rootContent}
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
