'use client';

import React from 'react';
import styled from 'styled-components';
import { Typography } from '@temp-workspace/ui';

const PageContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function AdminPage() {
  return (
    <PageContainer>
      <Typography variant="h4">Admin</Typography>
      <Typography variant="body1">
        System configuration, user management, and security settings.
      </Typography>
      <div
        style={{
          border: '1px dashed #ccc',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          borderRadius: '8px',
        }}
      >
        Admin Dashboard Placeholder
      </div>
    </PageContainer>
  );
}
