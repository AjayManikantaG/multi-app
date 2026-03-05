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

export default function AuditLogPage() {
  return (
    <PageContainer>
      <Typography variant="h4">Audit Log</Typography>
      <Typography variant="body1">
        Placeholder for Audit Log monitoring page.
      </Typography>
    </PageContainer>
  );
}
