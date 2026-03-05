'use client';

import React from 'react';
import { HeaderWrapper, LogoContainer, Title } from './header.styles';
import { Box } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Title>Multi-App Platform</Title>
      </LogoContainer>
      <Box sx={{ flexGrow: 1 }} />
      {/* Placeholder for future header items like notifications, profile, etc. */}
    </HeaderWrapper>
  );
};

export default Header;
