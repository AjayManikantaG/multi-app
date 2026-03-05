'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { CanvasWrapper } from './workflow-canvas.styles';

export const WorkflowCanvas: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Workflow Designer
      </Typography>
      <CanvasWrapper>
        <Typography color="textSecondary">
          Workflow Canvas Placeholder
        </Typography>
      </CanvasWrapper>
    </Box>
  );
};

export default WorkflowCanvas;
