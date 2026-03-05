'use client';

import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faChevronDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

import {
  PageContainer,
  HeaderRow,
  Title,
  StatusPill,
  SearchWrapper,
  StyledDataGridContainer,
} from './system-log.styles';

// ==========================================
// Data & Mock API
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
const TAGS = ['All', 'Prod', 'Billing', 'Dev', 'QA', 'Staging'];
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
const STATUSES = ['OK', 'Error'];
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

interface SystemLogRow {
  id: number;
  globalProcessId: string;
  processId: string;
  actionWorkflow: string;
  tag: string;
  priority: string;
  owner: string;
  node: string;
  inputModule: string;
  sourceInputFile: string;
  outputModule: string;
  stateOfInputFile: string;
  start: string;
  end: string;
  duration: string;
  status: string;
}

const RAW_ROWS: SystemLogRow[] = Array.from({ length: 100 }, (_, i) => ({
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

/**
 * Pre-calculate all available unique values for each given column field from the raw dataset.
 */
const getUniqueColumnValues = (field: string) => {
  const vals = new Set(
    RAW_ROWS.map((r) => String(r[field as keyof SystemLogRow] || '')),
  );
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

/**
 * Mock API Function to simulate server-side sorting, filtering, and pagination
 */
const fetchMockData = async (params: {
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  filterModel: Record<string, string[]>;
  globalSearch: string;
}): Promise<{ records: SystemLogRow[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...RAW_ROWS];

      // 1. Global Search
      if (params.globalSearch) {
        data = data.filter((row) =>
          Object.values(row).some((val) =>
            String(val)
              .toLowerCase()
              .includes(params.globalSearch.toLowerCase()),
          ),
        );
      }

      // 2. Column Filters
      if (params.filterModel) {
        for (const [field, selectedOptions] of Object.entries(
          params.filterModel,
        )) {
          if (selectedOptions.length > 0) {
            data = data.filter((row) => {
              const rowValue = String(row[field as keyof SystemLogRow] || '');
              return selectedOptions.includes(rowValue);
            });
          }
        }
      }

      // 3. Sorting
      if (params.sortModel && params.sortModel.length > 0) {
        const { field, sort } = params.sortModel[0];
        data = data.sort((a, b) => {
          const aVal = String(a[field as keyof SystemLogRow] || '');
          const bVal = String(b[field as keyof SystemLogRow] || '');
          if (sort === 'asc') return aVal.localeCompare(bVal);
          return bVal.localeCompare(aVal);
        });
      }

      // 4. Pagination
      const total = data.length;
      const start = params.page * params.pageSize;
      const paginatedData = data.slice(start, start + params.pageSize);

      resolve({ records: paginatedData, total });
    }, 600);
  });
};

// ==========================================
// Custom Filter Header Component
// ==========================================

function CustomColumnHeader({
  colDef,
  uniqueValues,
  filterModel,
  setFilterModel,
}: {
  colDef: GridColDef;
  uniqueValues: string[];
  filterModel: Record<string, string[]>;
  setFilterModel: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');

  const field = colDef.field;
  const activeFilters = filterModel[field] || [];
  const visibleValues = uniqueValues.filter((v: string) =>
    v.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (val: string) => {
    const newFilters = activeFilters.includes(val)
      ? activeFilters.filter((v: string) => v !== val)
      : [...activeFilters, val];

    setFilterModel((prev) => ({
      ...prev,
      [field]: newFilters,
    }));
  };

  const isAll =
    activeFilters.length === 0 || activeFilters.length === uniqueValues.length;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '0',
      }}
    >
      {/* ROW 1: Heading (Relies on native parent for Sorting) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 600,
          padding: '0 8px',
          color: '#333',
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {colDef.headerName}
        </span>
      </div>

      {/* ROW 2: Filtering Dropdown Area */}
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          e.preventDefault();
          setAnchorEl(e.currentTarget);
        }}
        style={{
          height: '34px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: isAll ? '#666' : '#1976d2',
          fontSize: '12px',
          padding: '0 8px',
          backgroundColor: '#fafafa',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <FontAwesomeIcon
          icon={faFilter}
          style={{ fontSize: '10px', marginRight: 6, color: '#999' }}
        />
        <span
          style={{
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: isAll ? 400 : 600,
          }}
        >
          {isAll ? 'All' : `${activeFilters.length} selected`}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{ fontSize: '10px', marginLeft: 4, color: '#ccc' }}
        />
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div style={{ padding: '12px', width: '240px' }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search filters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ fontSize: '12px', color: '#999' }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1, '& .MuiOutlinedInput-root': { fontSize: '13px' } }}
          />
          <div
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '4px',
            }}
          >
            {visibleValues.length === 0 && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ py: 1, px: 0.5 }}
              >
                No matching options
              </Typography>
            )}
            {visibleValues.map((val: string) => (
              <FormControlLabel
                key={val}
                control={
                  <Checkbox
                    size="small"
                    checked={activeFilters.includes(val)}
                    onChange={() => handleToggle(val)}
                    sx={{ padding: '4px 8px' }}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '13px', color: '#444' }}
                  >
                    {val || '(Blank)'}
                  </Typography>
                }
                sx={{
                  margin: 0,
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  borderRadius: '4px',
                }}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}

// ==========================================
// Column Definitions
// ==========================================

const columnsDefinition: GridColDef[] = [
  {
    field: 'globalProcessId',
    headerName: 'Global process ID',
    minWidth: 150,
    flex: 1,
  },
  { field: 'processId', headerName: 'Process ID', width: 120 },
  {
    field: 'actionWorkflow',
    headerName: 'Action/Work flow',
    minWidth: 160,
    flex: 1,
  },
  { field: 'tag', headerName: 'Tag', width: 90 },
  { field: 'priority', headerName: 'Priority', width: 100 },
  { field: 'owner', headerName: 'Owner', width: 100 },
  { field: 'node', headerName: 'Node', width: 120 },
  { field: 'inputModule', headerName: 'Input module', width: 130 },
  {
    field: 'sourceInputFile',
    headerName: 'Source input file',
    minWidth: 140,
    flex: 1,
  },
  { field: 'outputModule', headerName: 'Output module', width: 130 },
  { field: 'stateOfInputFile', headerName: 'State of input file', width: 140 },
  { field: 'start', headerName: 'Start', width: 110 },
  { field: 'end', headerName: 'End', width: 110 },
  { field: 'duration', headerName: 'Duration', width: 90 },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params: GridRenderCellParams) => (
      <StatusPill $status={params.value as string}>{params.value}</StatusPill>
    ),
  },
];

// ==========================================
// Main Component (exported)
// ==========================================

export function SystemLogPage() {
  const [view, setView] = useState('All');

  // Data Grid Server-Side State
  const [rows, setRows] = useState<SystemLogRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<Record<string, string[]>>({});

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };

  // Fetch Data whenever Server-Side State changes
  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchMockData({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortModel,
      filterModel,
      globalSearch: '',
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

  const gridColumns = columnsDefinition.map((col) => ({
    ...col,
    sortable: true,
    renderHeader: (params: { colDef: GridColDef }) => (
      <CustomColumnHeader
        colDef={params.colDef}
        uniqueValues={UNIQUE_VALUES_MAP[col.field] || []}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    ),
  }));

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {loading && <CircularProgress size={16} sx={{ color: '#999' }} />}
            <span style={{ fontSize: '14px', color: '#666' }}>
              Total: <strong>{rowCount}</strong>
            </span>
            <Pagination
              count={Math.ceil(rowCount / paginationModel.pageSize) || 1}
              page={paginationModel.page + 1}
              onChange={(_e: React.ChangeEvent<unknown>, value: number) => {
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
          </div>
        </SearchWrapper>
      </HeaderRow>

      <StyledDataGridContainer>
        <DataGrid
          rows={rows}
          columns={gridColumns}
          loading={loading}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterMode="server"
          disableColumnMenu
          disableRowSelectionOnClick
          rowHeight={48}
          columnHeaderHeight={76}
          hideFooter
        />
      </StyledDataGridContainer>
    </PageContainer>
  );
}

export default SystemLogPage;
