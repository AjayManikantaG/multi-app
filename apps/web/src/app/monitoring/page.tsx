"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomTable } from '@multi-app/ui';

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
`;

// Sample data for the table
const rows = [
  { id: 1, status: 0, server: 'Server A', memory: '4GB', type: 'Database' },
  { id: 2, status: 1, server: 'Server B', memory: '8GB', type: 'Cache' },
  { id: 3, status: 0, server: 'Server C', memory: '16GB', type: 'Application' },
  { id: 4, status: 1, server: 'Server D', memory: '8GB', type: 'Application' },
  { id: 5, status: 1, server: 'Server E', memory: '32GB', type: 'Database' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'server', headerName: 'Server Name', width: 200 },
  { field: 'memory', headerName: 'Memory Assigned', width: 200 },
  { field: 'type', headerName: 'Node Type', width: 200 },
  { field: 'status', headerName: 'Status Flag', width: 150 },
];

export default function MonitoringPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <PageContainer>
      <Title>System Monitoring Dashboard</Title>
      <CustomTable 
        rows={rows} 
        columns={columns} 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
    </PageContainer>
  );
}
