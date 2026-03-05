'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from '@mui/x-data-grid';
import {
  Typography,
  TextField,
  InputAdornment,
  Popover,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faChevronDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

// ==========================================
// Styled Components
// ==========================================

export const StatusPill = styled.div<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  display: inline-block;
  min-width: 60px;
  text-align: center;
  background-color: ${(props) => {
    const s = props.$status.toLowerCase();
    if (s === 'ok') return '#2e7d32';
    if (s === 'error') return '#d32f2f';
    return '#ed6c02';
  }};
`;

export const StyledDataGridContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  overflow: hidden;

  /* Custom styling for MUI DataGrid */
  .MuiDataGrid-root {
    border: none;
    font-family:
      'Inter',
      -apple-system,
      sans-serif;
  }

  .MuiDataGrid-columnHeaders {
    background-color: #fefefe;
    border-bottom: 2px solid #e0e0e0;
    color: #4a4a4a;
    font-weight: 600;
    font-size: 13px;
  }

  .MuiDataGrid-columnHeader {
    padding: 0 !important;
  }

  .MuiDataGrid-columnHeaderTitleContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 0 !important;
  }

  .MuiDataGrid-columnHeaderTitleContainerContent {
    flex: 1;
    display: flex;
    width: 100%;
  }

  /* Position Sort icons on the top 'row' of the header */
  .MuiDataGrid-iconButtonContainer {
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 10;
  }

  .MuiDataGrid-menuIcon {
    position: absolute;
    right: 28px;
    top: 8px;
    z-index: 10;
  }

  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-columnHeader:focus-within {
    outline: none;
  }

  .MuiDataGrid-row {
    cursor: pointer;
  }

  .MuiDataGrid-row:hover {
    background-color: #f4f6f8;
  }

  .MuiDataGrid-cell {
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    color: #333;
    display: flex;
    align-items: center;
  }
`;

// ==========================================
// Custom Filter Header Component
// ==========================================

interface CustomColumnHeaderProps {
  colDef: GridColDef;
  uniqueValues: string[];
  filterModel: Record<string, string[]>;
  setFilterModel: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}

function CustomColumnHeader({
  colDef,
  uniqueValues,
  filterModel,
  setFilterModel,
}: CustomColumnHeaderProps) {
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
      {/* ROW 1: Heading */}
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
        onClick={(e) => {
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
        onClose={(e: any) => {
          if (e) {
            e.stopPropagation();
          }
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
// Main Component
// ==========================================

export interface CustomDataGridProps {
  columns: GridColDef[];
  rows: Record<string, any>[];
  loading?: boolean;
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  filterModel: Record<string, string[]>;
  onFilterChange: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  uniqueValuesMap: Record<string, string[]>;
}

export function CustomDataGrid({
  columns,
  rows,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterChange,
  uniqueValuesMap,
}: CustomDataGridProps) {
  const gridColumns = columns.map((col) => ({
    ...col,
    sortable: true,
    renderHeader: (params: { colDef: GridColDef }) => (
      <CustomColumnHeader
        colDef={params.colDef}
        uniqueValues={uniqueValuesMap[col.field] || []}
        filterModel={filterModel}
        setFilterModel={onFilterChange}
      />
    ),
  }));

  return (
    <StyledDataGridContainer>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        loading={loading}
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        disableColumnMenu
        disableRowSelectionOnClick
        rowHeight={48}
        columnHeaderHeight={76}
        hideFooter
      />
    </StyledDataGridContainer>
  );
}

export default CustomDataGrid;
