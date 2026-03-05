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

export default function LoggingPage() {
  return (
    <PageContainer>
      <Typography variant="h4">Log Files</Typography>
      <Typography variant="body1">
        Browse and search through system and execution logs.
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
        Log Viewer Placeholder
      </div>
    </PageContainer>
  );
}
