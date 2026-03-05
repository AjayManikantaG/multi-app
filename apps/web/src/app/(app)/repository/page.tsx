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

export default function RepositoryPage() {
  return (
    <PageContainer>
      <Typography variant="h4">Repository</Typography>
      <Typography variant="body1">
        Manage your workflows, modules, and assets here.
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
        Repository Tree and Version Control Placeholder
      </div>
    </PageContainer>
  );
}
