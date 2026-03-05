'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, CustomDataGrid, StatusPill } from '@temp-workspace/ui';
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  Pagination,
  SelectChangeEvent,
} from '@mui/material';
import {
  GridColDef,
  GridSortModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';

// ==========================================
// Styled Components
// ==========================================

const PageContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 64px);
  background-color: #f8f9fa;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 12px;
`;

// ==========================================
// Mock Data Generation
// ==========================================

const WORKFLOWS = [
  'System startup',
  'Task scheduler',
  'Payment processing',
  'Data sync',
  'User auth',
  'Report generation',
  'Email dispatch',
  'File import',
  'Batch cleanup',
  'API gateway',
];
const TAGS = ['Prod', 'Billing', 'Dev', 'QA', 'Staging'];
const PRIORITIES = ['Normal', 'High', 'Low', 'Critical'];
const OWNERS = ['Root', 'System', 'Admin', 'Scheduler'];
const NODES = [
  'Ker-001',
  'Ker-002',
  'Ker-003',
  'Ker-004',
  'Ker-005',
  'Ker-006',
  'Ker-007',
  'Ker-008',
];
const INPUT_MODULES = [
  'System',
  'CRON',
  'API',
  'FTP',
  'SFTP',
  'HTTP',
  'SOAP',
  'REST',
];
const OUTPUT_MODULES = [
  'System',
  'Log',
  'DB',
  'File',
  'Email',
  'Queue',
  'S3',
  'Kafka',
];
const STATUSES = ['OK', 'Error', 'Warning'];
const DATES = [
  'Feb 18',
  'Feb 19',
  'Feb 20',
  'Feb 21',
  'Feb 22',
  'Feb 23',
  'Feb 24',
  'Feb 25',
];

const RAW_ROWS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  globalProcessId: String(100000 + Math.floor(Math.random() * 900000)),
  processId: i % 5 === 0 ? String(1000 + i) : '-',
  actionWorkflow: WORKFLOWS[i % WORKFLOWS.length],
  tag: TAGS[i % TAGS.length],
  priority: PRIORITIES[i % PRIORITIES.length],
  owner: OWNERS[i % OWNERS.length],
  node: NODES[i % NODES.length],
  inputModule: INPUT_MODULES[i % INPUT_MODULES.length],
  sourceInputFile: String(i % 3),
  outputModule: OUTPUT_MODULES[i % OUTPUT_MODULES.length],
  stateOfInputFile: String(i % 2),
  start: DATES[i % DATES.length],
  end: DATES[(i + 1) % DATES.length],
  duration: String(Math.floor(Math.random() * 120)),
  status: STATUSES[i % STATUSES.length],
}));

const getUniqueColumnValues = (field: string) => {
  const vals = new Set(RAW_ROWS.map((r: any) => String(r[field] || '')));
  return Array.from(vals).sort();
};

const UNIQUE_VALUES_MAP: Record<string, string[]> = {
  globalProcessId: getUniqueColumnValues('globalProcessId'),
  processId: getUniqueColumnValues('processId'),
  actionWorkflow: getUniqueColumnValues('actionWorkflow'),
  tag: getUniqueColumnValues('tag'),
  priority: getUniqueColumnValues('priority'),
  owner: getUniqueColumnValues('owner'),
  node: getUniqueColumnValues('node'),
  inputModule: getUniqueColumnValues('inputModule'),
  sourceInputFile: getUniqueColumnValues('sourceInputFile'),
  outputModule: getUniqueColumnValues('outputModule'),
  stateOfInputFile: getUniqueColumnValues('stateOfInputFile'),
  start: getUniqueColumnValues('start'),
  end: getUniqueColumnValues('end'),
  duration: getUniqueColumnValues('duration'),
  status: getUniqueColumnValues('status'),
};

const fetchMockData = async (params: {
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  filterModel: Record<string, string[]>;
}): Promise<{ records: any[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...RAW_ROWS];

      // Column Filters
      if (params.filterModel) {
        for (const [field, selectedOptions] of Object.entries(
          params.filterModel,
        )) {
          if (selectedOptions.length > 0) {
            data = data.filter((row) => {
              const rowValue = String(row[field as keyof typeof row] || '');
              return selectedOptions.includes(rowValue);
            });
          }
        }
      }

      // Sorting
      if (params.sortModel && params.sortModel.length > 0) {
        const { field, sort } = params.sortModel[0];
        data = data.sort((a, b) => {
          const aVal = String(a[field as keyof typeof a] || '');
          const bVal = String(b[field as keyof typeof b] || '');
          if (sort === 'asc') return aVal.localeCompare(bVal);
          return bVal.localeCompare(aVal);
        });
      }

      const total = data.length;
      const start = params.page * params.pageSize;
      const paginatedData = data.slice(start, start + params.pageSize);

      resolve({ records: paginatedData, total });
    }, 600);
  });
};

const columnsDefinition: GridColDef[] = [
  { field: 'globalProcessId', headerName: 'Global process ID', width: 150 },
  { field: 'processId', headerName: 'Process ID', width: 120 },
  { field: 'actionWorkflow', headerName: 'Action/Work flow', width: 180 },
  { field: 'tag', headerName: 'Tag', width: 100 },
  { field: 'priority', headerName: 'Priority', width: 100 },
  { field: 'owner', headerName: 'Owner', width: 100 },
  { field: 'node', headerName: 'Node', width: 120 },
  { field: 'inputModule', headerName: 'Input module', width: 130 },
  { field: 'sourceInputFile', headerName: 'Source input file', width: 150 },
  { field: 'outputModule', headerName: 'Output module', width: 130 },
  { field: 'stateOfInputFile', headerName: 'State of input file', width: 150 },
  { field: 'start', headerName: 'Start', width: 130 },
  { field: 'end', headerName: 'End', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        <StatusPill $status={params.value as string}>{params.value}</StatusPill>
      </Box>
    ),
  },
];

export default function SystemLogPage() {
  const [view, setView] = useState('All');
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<Record<string, string[]>>({});

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchMockData({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortModel,
      filterModel,
    }).then((response) => {
      if (!active) return;
      setRows(response.records);
      setRowCount(response.total);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [paginationModel, sortModel, filterModel]);

  return (
    <PageContainer>
      <HeaderRow>
        <Title>System log</Title>
        <Select
          value={view}
          onChange={handleDropdownChange}
          size="small"
          sx={{
            minWidth: 150,
            height: 36,
            backgroundColor: '#fff',
            fontSize: 14,
          }}
        >
          <MenuItem value="All">Global process ID</MenuItem>
          <MenuItem value="Recent">Process ID</MenuItem>
          <MenuItem value="Errors">Action/Workflow</MenuItem>
        </Select>

        <SearchWrapper>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {loading && <CircularProgress size={16} sx={{ color: '#999' }} />}
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              Total: <strong>{rowCount}</strong>
            </Typography>
            <Pagination
              count={Math.ceil(rowCount / paginationModel.pageSize) || 1}
              page={paginationModel.page + 1}
              onChange={(_e, value) => {
                setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
              }}
              color="primary"
              size="small"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              showFirstButton
              showLastButton
            />
          </Box>
        </SearchWrapper>
      </HeaderRow>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <CustomDataGrid
          columns={columnsDefinition}
          rows={rows}
          loading={loading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterChange={setFilterModel}
          uniqueValuesMap={UNIQUE_VALUES_MAP}
        />
      </Box>
    </PageContainer>
  );
}
