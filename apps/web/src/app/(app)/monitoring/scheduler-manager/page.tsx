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

export default function SchedulerManagerPage() {
  return (
    <PageContainer>
      <Typography variant="h4">Scheduler Manager</Typography>
      <Typography variant="body1">
        Placeholder for Scheduler Manager monitoring page.
      </Typography>
    </PageContainer>
  );
}
