'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  HeaderWrapper,
  LogoSection,
  LogoContainer,
  Breadcrumb,
  HeaderActions,
  ActionItem,
  Divider,
} from './header.styles';
import {
  Person as PersonIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Tune as TuneIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

export const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoContainer>
          <span>VV</span>VIRTIMO INUBIT
        </LogoContainer>
        <Breadcrumb>
          {pathname?.includes('/monitoring') ? (
            <>
              Monitoring &gt;{' '}
              <b>{pathname.split('/').pop()?.replace('-', ' ')}</b>
            </>
          ) : (
            <>
              Flow 02 &gt; <b>Flow 01</b>
            </>
          )}
        </Breadcrumb>
      </LogoSection>

      <HeaderActions>
        <ActionItem>
          <PersonIcon fontSize="small" />
          User name (Admin)
        </ActionItem>
        <ActionItem>
          EN
          <ExpandMoreIcon fontSize="inherit" />
        </ActionItem>
        <Divider />
        <ActionItem>
          <SearchIcon fontSize="small" />
        </ActionItem>
        <ActionItem>
          <NotificationsIcon fontSize="small" />
        </ActionItem>
        <ActionItem>
          <TuneIcon fontSize="small" />
        </ActionItem>
      </HeaderActions>
    </HeaderWrapper>
  );
};

export default Header;
