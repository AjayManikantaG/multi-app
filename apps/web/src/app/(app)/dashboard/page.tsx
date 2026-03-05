'use client';

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h3">1,234</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">System Status</Typography>
            <Typography variant="h3" color="success.main">
              Healthy
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Logs Today</Typography>
            <Typography variant="h3">500+</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
